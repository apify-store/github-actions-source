import { ApifyClient } from 'apify-client';
import type { BuildData, KvsPersistRecord, GitHubEvent } from './types.js';
export declare class StateController {
    private readonly persistKvClient;
    private readonly testApifyClient;
    readonly buildTestState: KvsPersistRecord;
    private readonly stateRecordKeys;
    private constructor();
    static init(githubEvent: GitHubEvent): Promise<StateController>;
    saveBuildAndActorId: (buildData: BuildData) => void;
    saveTestRun: (testTaskName: string, runId: string) => void;
    persistBuildAndTestRuns: () => Promise<void>;
    clearTests: () => Promise<void>;
    getTesterApifyClient: () => ApifyClient;
    cleanup: () => Promise<void>;
    getLastValidatedCommit: () => Promise<string | undefined>;
    setLastValidatedCommit: () => Promise<void>;
}
