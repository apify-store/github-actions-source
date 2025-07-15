export interface GitHubHeadCommit {
    added: string[];
    removed: string[];
    modified: string[];
    author: {
        name: string;
    };
    message: string;
    id: string;
}
export interface Repository {
    full_name: string;
    name: string;
    owner: {
        login: string;
    };
}
export type GitHubEvent = GitHubEventPullRequest | GitHubEventPush;
export type RawGitHubEvent = Partial<Omit<GitHubEventPullRequest, 'type'> & Omit<GitHubEventPush, 'type'>>;
export interface GitHubEventPullRequest {
    type: 'pull_request';
    pull_request: {
        number: number;
        base: {
            ref: string;
            sha: string;
        };
        head: {
            ref: string;
            sha: string;
        };
    };
    repository: Repository;
}
export interface GitHubEventPush {
    type: 'push';
    head_commit: GitHubHeadCommit;
    repository: Repository;
    ref: string;
}
export interface BuildData {
    buildId: string;
    actorId: string;
    actorName: string;
    buildNumber: string;
}
export type KvsPersistRecord = {
    builds: {
        [actorName: string]: BuildData;
    };
    testRuns: {
        [actorName: string]: string;
    };
    githubEvent: GitHubEvent;
};
export interface ActorConfig {
    actorName: string;
    folder: string;
    isStandalone: boolean;
}
export interface TestActorConfig {
    actorName: string;
    buildNumber: string;
    testTaskName: string;
}
