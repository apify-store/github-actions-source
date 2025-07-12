import type { ActorConfig, GitHubHeadCommit, BuildData, GitHubEvent } from './types.js';
export declare const spawnCommandInGhWorkspace: (command: string, args?: string[]) => string;
export declare const isMasterBranch: (ref: string | undefined) => boolean;
export declare const getRepoName: (githubEvent: GitHubEvent) => string;
export declare const getGitHubEvent: () => Promise<GitHubEvent>;
export declare const getCommitFolderNames: (head_commit: GitHubHeadCommit) => string[];
export declare const deduplicateConfigs: (actorConfigs: ActorConfig[]) => ActorConfig[];
export declare const getEnvVar: (varName: string, defaultValue?: string) => string;
/**
 * We provide a mapping of actor names and IDs to build numbers
 * The testing Actor then matches the run from test (which can be by name or ID) to a build number to be run
 * We also have to provide buildIds to be able to fetch input schema from build without token
*/
export declare const formatBuildNumsAndIdsForTesting: (buildDataArr: BuildData[]) => {
    buildNums: Record<string, string>;
    buildIds: Record<string, string>;
};
/**
 * Reads and parses all directories in `actors` directory
 * This works locally if checkoutRepoLocally is called first
 */
export declare const getRepoActors: () => Promise<ActorConfig[]>;
export declare const getHeadCommitSha: (githubEvent: GitHubEvent) => string;
export declare const checkoutRepoLocally: (githubEvent: GitHubEvent) => void;
/**
 * Requires checkout action to be run before
 */
export declare const getLastCommitAdditions: (filename: string) => string;
/**
 * Requires checkout action to be run before
 * FIXME: For PRs, we might need more than diff last 2 commits, the problems are:
 * 1. PR is opened after several commits in the branch happened - need to compare with the rebased base
 * 2. New commit in the PR happens quickly after another and previous check is cancelled
 */
export declare const getLastCommitAffectedFiles: (githubEvent: GitHubEvent, lastValidatedCommit?: string) => string[];
export interface GetChangedActorsResult {
    actorsChanged: ActorConfig[];
    codeChanged: boolean;
}
interface ShouldBuildAndTestOptions {
    filepathsChanged: string[];
    actorConfigs: ActorConfig[];
    isLatest: boolean;
}
/**
 * Latest and devel are the same except that for latest we also rebuild with README and CHANGELOG files
 */
export declare const getChangedActors: ({ filepathsChanged, actorConfigs, isLatest }: ShouldBuildAndTestOptions) => GetChangedActorsResult;
export {};
