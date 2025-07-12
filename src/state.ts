import type { KeyValueStoreClient } from 'apify-client';
import log from '@apify/log';
import { ApifyClient } from 'apify-client';
import type { BuildData, KvsPersistRecord, GitHubEvent, GitHubEventPullRequest } from './types.js';
import { getEnvVar, getHeadCommitSha, getRepoName } from './utils.js';
import { PERSISTED_GH_JOBS_KVS_ID } from './consts.js';

const generateStateRecordKey = (githubEvent: GitHubEvent) => {
    const sanitizedName = githubEvent.repository.full_name.replace('/', '-');

    const sha = getHeadCommitSha(githubEvent);

    const runStateKey = `REV-${sanitizedName}-${sha}`;
    return runStateKey;
};

interface StateRecordKeys {
    /**
     * Stores state for the whole PR, currently only last validated commit that is updated on successful tests
     */
    perPRLastValidatedCommit: string | null
    /**
     * Stores build and test runs for each commit
     */
    perCommitBuildTest: string
}

export class StateController {
    private constructor(
        private readonly persistKvClient: KeyValueStoreClient,
        private readonly testApifyClient: ApifyClient,
        readonly buildTestState: KvsPersistRecord,
        private readonly stateRecordKeys: StateRecordKeys,
    ) { /* */ }

    static async init(githubEvent: GitHubEvent) {
        const testApifyToken = getEnvVar('TESTER_APIFY_TOKEN');
        const testApifyClient = new ApifyClient({ token: testApifyToken });
        // Initialize client for Testing admin account
        const persistKvClient = testApifyClient.keyValueStore(PERSISTED_GH_JOBS_KVS_ID);

        const stateRecordKeys: StateRecordKeys = {
            perCommitBuildTest: generateStateRecordKey(githubEvent),
            perPRLastValidatedCommit: githubEvent.type === 'pull_request' ? `${getRepoName(githubEvent)}-PR-${githubEvent.pull_request.number}` : null,
        };

        // Had trouble making the types work here
        const previousState = (await persistKvClient.getRecord(stateRecordKeys.perCommitBuildTest))?.value as KvsPersistRecord | undefined;
        const buildTestState = previousState ?? { builds: {}, testRuns: {} } as KvsPersistRecord;
        // We always attach the current event, useful for local testing if we don't want to change anything in it
        buildTestState.githubEvent = githubEvent;

        const stateController = new StateController(persistKvClient, testApifyClient, buildTestState, stateRecordKeys);

        // Store empty state at the start
        await stateController.persistBuildAndTestRuns();

        const stateUrl = `https://api.apify.com/v2/key-value-stores/${PERSISTED_GH_JOBS_KVS_ID}/records/${stateRecordKeys.perCommitBuildTest}`;
        log.info(`[STATE] Opened state that includes GitHub event data on URL: ${stateUrl}`);
        return stateController;
    }

    saveBuildAndActorId = (buildData: BuildData) => {
        this.buildTestState.builds[buildData.actorName] = buildData;
    };

    saveTestRun = (testTaskName: string, runId: string) => {
        this.buildTestState.testRuns[testTaskName] = runId;
    };

    persistBuildAndTestRuns = async () => {
        // The type with JsonValue is broken
        await this.persistKvClient.setRecord({ key: this.stateRecordKeys.perCommitBuildTest, value: this.buildTestState as unknown as string });
    };

    clearTests = async () => {
        this.buildTestState.testRuns = {};
        await this.persistBuildAndTestRuns();
    };

    getTesterApifyClient = () => {
        return this.testApifyClient;
    };

    // If user does rerun workflows on GitHub, we want the tests run again (in case they fixed them)
    // But builds are bound to a commit so we want to keep them
    cleanup = async () => {
        await this.clearTests();
    };

    getLastValidatedCommit = async () => {
        // Check that what was the last commit where our test succeeded, we will diff files vs that
        // This is to skip running test suite if we only updated changelog etc. in the last PR commit
        let prState: { lastValidatedCommit: string } | undefined;
        if (this.stateRecordKeys.perPRLastValidatedCommit) {
            prState = (await this.persistKvClient.getRecord(this.stateRecordKeys.perPRLastValidatedCommit))
                ?.value as { lastValidatedCommit: string } | undefined;
            if (prState) {
                return prState.lastValidatedCommit;
            }
        }

        return undefined;
    };

    setLastValidatedCommit = async () => {
        // Only releevant for PRs
        if (!this.stateRecordKeys.perPRLastValidatedCommit) {
            return;
        }
        // We succeeded and tests passed, we can save the last valid commit
        // We always want to update the lastValidatedCommit only for successful test suite
        const headCommitSha = (this.buildTestState.githubEvent as GitHubEventPullRequest).pull_request.head.sha;
        await this.persistKvClient.setRecord({ key: this.stateRecordKeys.perPRLastValidatedCommit, value: { lastValidatedCommit: headCommitSha } });

        log.info(`[TEST] All tests finished successfully, storing lastValidatedCommit to KVS... `
            + `${this.stateRecordKeys.perPRLastValidatedCommit} = ${headCommitSha}`);
    };
}
