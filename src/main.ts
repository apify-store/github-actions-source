import { Actor } from 'apify';

import {
    getRepoActors, getLastCommitAffectedFiles,
    getChangedActors, getGitHubEvent, getRepoName,
} from './utils.js';
import { pushToBuildLatest } from './push-release-latest.js';
import { pullRequestToBuildAndTest } from './pr-build-test.js';
import { StateController } from './state.js';
import { MINIACTORS_LIST_STORE_ID } from './consts.js';

await Actor.init();

const githubEvent = await getGitHubEvent();

// NOTE: This requires the calling workflow to use Checkout action before
const actorConfigs = await getRepoActors();

const stateController = await StateController.init(githubEvent);

const filepathsChanged = await getLastCommitAffectedFiles(githubEvent, await stateController.getLastValidatedCommit());
const changedActorsResult = getChangedActors({ filepathsChanged, actorConfigs, isLatest: githubEvent.type === 'push' });

let errorMessage: string | undefined;
if (githubEvent.type === 'pull_request') {
    const { prErrorMessage } = await pullRequestToBuildAndTest(changedActorsResult, stateController);
    errorMessage = prErrorMessage;
} else if (githubEvent.type === 'push') {
    const { actorsChanged } = changedActorsResult;
    await pushToBuildLatest(actorsChanged, stateController);

    // We need to tell testing Actor what miniactors exist in 'latest` for scheduled tests (for CI tests we send it directly
    // We need to call this function outside of pushToBuildLatest because we want all miniactors stored, not just changed ones
    await stateController.getTesterApifyClient().keyValueStore(MINIACTORS_LIST_STORE_ID)
        .setRecord({ key: getRepoName(stateController.buildTestState.githubEvent), value: actorConfigs.map(({ actorName }) => actorName) });
}

await stateController.cleanup();

if (errorMessage) {
    throw await Actor.fail(errorMessage);
} else {
    await stateController.setLastValidatedCommit();
}

await Actor.exit();
