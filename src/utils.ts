import fs from 'node:fs/promises';
import log from '@apify/log';
import { spawnSync } from 'node:child_process';
import type { ActorConfig, GitHubHeadCommit, BuildData, GitHubEvent, GitHubEventPullRequest, GitHubEventPush, RawGitHubEvent } from './types.js';

const MASTER_BRANCH_NAMES = [
    'master',
    'main',
];

export const spawnCommandInGhWorkspace = (command: string, args: string[] = []) => {
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    const commandInGhWorkspace = `cd ${ghWorkspace}; ${command}`;
    const commandResult = spawnSync(commandInGhWorkspace, args, { shell: true, maxBuffer: 100 * 1024 * 1024 });

    if (commandResult.error) {
        throw new Error(`[Command failed]: ${commandInGhWorkspace}\n${commandResult.error}`);
    }

    if (commandResult.stderr.toString().length > 0) {
        // For some reason 'git' command prints stderr when checking out to detached HEAD state (we only use detached HEAD for testing though)
        if (!commandResult.stderr.toString().includes(`You are in 'detached HEAD' state`)) {
            throw new Error(`[Command printed stderr]: ${commandInGhWorkspace}\n${commandResult.stderr.toString()}`);
        }
    }

    return commandResult.stdout.toString();
};

// ref: 'refs/heads/master'
export const isMasterBranch = (ref: string | undefined): boolean => {
    if (!ref) {
        return false;
    }
    const branch = ref.replace('refs/heads/', '');
    return MASTER_BRANCH_NAMES.some((name) => branch === name);
};

export const getRepoName = (githubEvent: GitHubEvent) => {
    const [, repoName] = githubEvent.repository.full_name.split('/');
    return repoName;
};

const parseGitHubEvent = (rawGitHubEvent: RawGitHubEvent): GitHubEvent => {
    if (rawGitHubEvent.repository && rawGitHubEvent.pull_request) {
        log.info('Parsed GitHub event as PR, starting PR build and test');
        return {
            type: 'pull_request',
            ...rawGitHubEvent,
        } as GitHubEventPullRequest;
    }
    if (rawGitHubEvent.repository && rawGitHubEvent.ref && rawGitHubEvent.head_commit) {
        log.info('Parsed GitHub event as push, starting building latest');
        return {
            type: 'push',
            ...rawGitHubEvent,
        } as GitHubEventPush;
    }
    throw new Error('No githubEvent.pull_request (PR) or githubEvent.head_commit (push)');
};

export const getGitHubEvent = async () => {
    let githubEvent: GitHubEvent;

    if (process.env.GITHUB_EVENT_PATH) {
        const githubEventPath = getEnvVar('GITHUB_EVENT_PATH');
        const rawGitHubEvent = JSON.parse((await fs.readFile(githubEventPath)).toString());
        githubEvent = parseGitHubEvent(rawGitHubEvent);
    } else {
        // Running locally outside of GitHub Actions
        const input = await fs.readFile('storage/key_value_stores/default/INPUT.json', 'utf-8')
        let maybeRawGithubEvent: RawGitHubEvent | undefined;
        try {
            maybeRawGithubEvent = JSON.parse(input);
        } catch (err) {
            throw new Error(`Failed to parse INPUT.json with error: ${err}`);
        }
        if (maybeRawGithubEvent && maybeRawGithubEvent.repository) {
            githubEvent = parseGitHubEvent(maybeRawGithubEvent);
        } else {
            throw new Error('No githubEvent found either in GITHUB_EVENT_PATH or as input locally');
        }

        // Clone trigerring locally repo to mimic Checkout action
        await checkoutRepoLocally(githubEvent);
    }

    return githubEvent;
};

export const getCommitFolderNames = (head_commit: GitHubHeadCommit): string[] => {
    // Empty arrays if nothing was changed there
    const { added, removed, modified } = head_commit;
    const updatedFiles = added.concat(removed).concat(modified);
    log.info(`All updated files:`);
    console.dir(updatedFiles);
    // We don't care about top level files updated here, those are handled by default
    const updatedFolders = [];
    for (const file of updatedFiles) {
        const isFolder = file.split('/').length > 1;
        if (isFolder) {
            const parts = file.split('/');
            const folderPath = parts.slice(0, parts.length - 1);
            updatedFolders.push(...folderPath);
        }
    }
    log.info('All updated folders:');
    console.dir(updatedFolders);
    return updatedFolders;
};

export const deduplicateConfigs = (actorConfigs: ActorConfig[]): ActorConfig[] => {
    const deduplicated: Record<string, ActorConfig> = {};
    for (const config of actorConfigs) {
        const { actorName } = config;
        deduplicated[actorName] = config;
    }
    return Object.values(deduplicated);
};

export const getEnvVar = (varName: string, defaultValue?: string): string => {
    const value = process.env[varName] ?? defaultValue;
    if (!value) {
        throw new Error(`${varName} not defined`);
    }
    return value;
};

/**
 * We provide a mapping of actor names and IDs to build numbers
 * The testing Actor then matches the run from test (which can be by name or ID) to a build number to be run
 * We also have to provide buildIds to be able to fetch input schema from build without token
*/
export const formatBuildNumsAndIdsForTesting = (buildDataArr: BuildData[]) => {
    const buildNums: Record<string, string> = {};
    const buildIds: Record<string, string> = {};
    for (const buildData of buildDataArr) {
        const { actorName, actorId, buildNumber, buildId } = buildData;
        buildNums[actorName] = buildNumber;
        buildNums[actorId] = buildNumber;
        buildIds[actorName] = buildId;
        buildIds[actorId] = buildId;
    }
    return { buildNums, buildIds };
};

/**
 * Reads and parses all directories in `actors` directory
 * This works locally if checkoutRepoLocally is called first
 */
export const getRepoActors = async (): Promise<ActorConfig[]> => {
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    let actorDirs: string[];
    try {
        actorDirs = (await fs.readdir(`${ghWorkspace}/actors`)).map((dir) => `actors/${dir}`);
    } catch (err) {
        log.warning(`No /actors directory found in repo`);
        actorDirs = [];
    }
    let standaloneActorDirs: string[];
    try {
        standaloneActorDirs = (await fs.readdir(`${ghWorkspace}/standalone-actors`)).map((dir) => `standalone-actors/${dir}`);
    } catch (err) {
        log.warning(`No /standalone-actors directory found in repo`);
        standaloneActorDirs = [];
    }
    const actorConfigs: ActorConfig[] = [];
    for (const actorDir of [...actorDirs, ...standaloneActorDirs]) {
        const match = actorDir.match(/^([^/]+)\/([^_]+)_([^_]+)$/);
        if (!match) {
            throw new Error(`Invalid actor directory name. Got "${actorDir}", expected "actor.owner-name_actor-name"`);
        }
        const [, folderType, owner, actorName] = match;
        actorConfigs.push({
            actorName: `${owner}/${actorName}`,
            folder: actorDir,
            isStandalone: folderType === 'standalone-actors',
        });
    }
    log.info(`Actors in repo: ${actorConfigs.filter(({ isStandalone }) => !isStandalone).map(({ actorName }) => actorName).join(', ')}`);
    log.info(`Standalone actors in repo: ${actorConfigs.filter(({ isStandalone }) => !!isStandalone).map(({ actorName }) => actorName).join(', ')}`);
    return actorConfigs;
};

export const getHeadCommitSha = (githubEvent: GitHubEvent) => {
    return githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.sha
        : githubEvent.head_commit.id;
};

export const checkoutRepoLocally = (githubEvent: GitHubEvent) => {
    const headRef = githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.ref
        : githubEvent.ref;

    log.info(`Cloning repo ${githubEvent.repository.full_name} with head ref ${headRef}`);
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    const repoUrl = `https://github.com/${githubEvent.repository.full_name}`;
    const branch = headRef.replace('refs/heads/', '');
    const removeResult = spawnSync('rm', ['-rf', `${ghWorkspace}`]);
    if (removeResult.error) {
        throw removeResult.error;
    }

    // We only need to clone more than last 2 commits if we want to test older commits,
    // I just randomly choose 20
    const result = spawnSync(`git`, ['clone', repoUrl, '--depth', '20', '--branch', branch, '--single-branch', ghWorkspace]);
    if (result.error) {
        throw result.error;
    }

    // Checkout the repo to the correct commit, this is useful if we want to test older commit
    // that is no longer at the head of the branch
    const commitSha = getHeadCommitSha(githubEvent);
    spawnCommandInGhWorkspace(`git checkout ${commitSha}`);

    log.info(`Cloned repo repo ${githubEvent.repository.full_name} with head ref ${headRef}`);
};

/**
 * Matches filename in top level or in directory
 * Unlike git, it is case insensitive (because Apify used uppercase config filenames and now uses lowercase mostly)
 */
const getLastCommitDiffForFile = (fileToDiff: string) => {
    log.info(`[DIFF]: Getting last commit diff for filepath ending with ${fileToDiff}`);

    // 'git' command doesn't have case insensitive option, so we need to check the files with extra logic
    const filesChangedString = spawnCommandInGhWorkspace(`git diff HEAD^ HEAD --name-only`);

    // We don't use regex because we would need to escape all the special characters in the filename and grep is ugly
    const filesChanged = filesChangedString.split('\n').filter((filepath) => {
        // Either we match the file exactly
        return filepath.toLowerCase() === fileToDiff.toLowerCase()
            // Or it is in a directory
            || filepath.toLowerCase().endsWith(`/${fileToDiff.toLowerCase()}`);
    });

    log.info(`[DIFF]: Files changed with ${fileToDiff} in last commit: ${filesChanged.join(', ')}`);

    if (filesChanged.length === 0) {
        return '';
    }

    // 'git diff' can take more files but they need to be separated by spaces, not newlines
    const filesSpacesSeparated = filesChanged.join(' ');

    // NOTE: If you play with this locally, be aware that passing files with -- only works properly if you execute 'git' from the repo root
    // Default maxBuffer is only 1MB which can crash on large diffs, 100 MB should be safe
    return spawnCommandInGhWorkspace(`git diff HEAD^ HEAD -- ${filesSpacesSeparated}`);
};

/**
 * Requires checkout action to be run before
 */
export const getLastCommitAdditions = (filename: string) => {
    const diff = getLastCommitDiffForFile(filename);

    const added = [];

    let startedChangelog = false;
    for (const line of diff.split('\n')) {
        // We should already get only files we care about from getLastCommitDiffForFile but better to double check
        if (line.startsWith('+++') && line.toLowerCase().includes(filename.toLowerCase())) {
            startedChangelog = true;
            continue;
        }
        if (startedChangelog) {
            if (line.startsWith('diff')) {
                break;
            }

            if (line.startsWith('+')) {
                added.push(line.slice(1).trim());
            }
        }
    }

    return added.join('\n').trim();
};

/**
 * Requires checkout action to be run before
 * FIXME: For PRs, we might need more than diff last 2 commits, the problems are:
 * 1. PR is opened after several commits in the branch happened - need to compare with the rebased base
 * 2. New commit in the PR happens quickly after another and previous check is cancelled
 */
export const getLastCommitAffectedFiles = (githubEvent: GitHubEvent, lastValidatedCommit?: string) => {
    const commitHashesRevList = spawnCommandInGhWorkspace(`git rev-list HEAD`);

    // Sorted from HEAD to past
    const commitHashes = commitHashesRevList.split('\n').filter(Boolean);

    log.info(`[DIFF]: actions/checkout@v4 fetched ${commitHashes.length} commit hashes. Fetched: ${commitHashes.join(', ')}`);

    let baseCommitShaPR = githubEvent.type === 'pull_request' ? githubEvent.pull_request.base.sha : null;

    // We keep track of tested commits so if we only update readme, we will not run tests
    if (lastValidatedCommit) {
        log.info(`[DIFF]: Using last validated commit ${lastValidatedCommit}`);
        // If there was a force-push rewriting history, we will diff from scratch from the base
        // But we highly discourage force pushing/rebasing that rewrite history because history of tests and actions will not make sense
        const wasForcePushed = !commitHashes.includes(lastValidatedCommit);
        if (wasForcePushed) {
            log.warning(`[DIFF]: We detected force push, diffing from scratch from the base. Don't use force-pushing/rebasing that rewrite history`
                + `unless you absolutely have to!`);
        } else if (lastValidatedCommit === commitHashes[0]) {
            // If we run again with the same commit, we want to enable running from scratch in case tests have been changed meanwhile
            log.info(`[DIFF]: We detected that we are running again with the same commit, instead diffing from scratch from the base to enable full rerun.`);
        } else {
            baseCommitShaPR = lastValidatedCommit;
        }
    }

    // Either base (or last validated) of PR or previous commit for pushes
    const commitToDiff = baseCommitShaPR || commitHashes[1];

    let commitsDiffCount = 0;
    for (const commit of commitHashes) {
        commitsDiffCount++;
        if (commit === commitToDiff) {
            break;
        }
    }

    log.info(`[DIFF]: We fetched ${commitHashes.length} commits (should be 2 for push). Diffing ${commitsDiffCount} commits back `
        + `HEAD ${commitHashes[0]} to ${commitToDiff}.`);

    const diffOutput = spawnCommandInGhWorkspace(`git diff --name-only ${commitToDiff} ${commitHashes[0]}`);

    const files = diffOutput.split('\n').filter(Boolean);

    log.info(`[DIFF]: Last commit affected files: ${files.join(', ')}`);

    return files;
};

export interface GetChangedActorsResult {
    actorsChanged: ActorConfig[];
    codeChanged: boolean;
}

interface ShouldBuildAndTestOptions {
    filepathsChanged: string[];
    actorConfigs: ActorConfig[];
    // Just for logging
    isLatest: boolean;
}

/**
 * Also works for folders
 */
const isIgnoredTopLevelFile = (lowercaseFilePath: string) => {
    // On top level, we should only have dev-only readme and .actor/ is just for apify push CLI (real Actor configs are in /actors)
    const IGNORED_TOP_LEVEL_FILES = ['.vscode/', '.gitignore', 'readme.md', '.husky/', '.eslintrc', '.editorconfig', '.actor/'];
    // Strip out deprecated /code and /shared folders, treat them as top-level code
    const sanitizedLowercaseFilePath = lowercaseFilePath.replace(/^code\//, '').replace(/^shared\//, '');

    return IGNORED_TOP_LEVEL_FILES.some((ignoredFile) => sanitizedLowercaseFilePath.startsWith(ignoredFile));
};

const isLatestBuildOnlyFile = (lowercaseFilePath: string) => {
    if (lowercaseFilePath.endsWith('changelog.md')) {
        return true;
    }

    // Either in /actors or /standalone-actors, we need to rebuild readme but we don't rebuild top-level dev-only readme
    if ((lowercaseFilePath.startsWith('actors/') || lowercaseFilePath.startsWith('standalone-actors/')) && lowercaseFilePath.endsWith('readme.md')) {
        return true;
    }

    return false;
};

/**
 * Latest and devel are the same except that for latest we also rebuild with README and CHANGELOG files
 */
export const getChangedActors = (
    { filepathsChanged, actorConfigs, isLatest }: ShouldBuildAndTestOptions,
): GetChangedActorsResult => {
    let codeChanged = false;
    // folder -> ActorConfig
    const actorsChangedMap = new Map<string, ActorConfig>();

    const actorConfigsWithoutStandalone = actorConfigs.filter(({ isStandalone }) => !isStandalone);

    const lowercaseFiles = filepathsChanged.map((file) => file.toLowerCase());

    for (const lowercaseFilePath of lowercaseFiles) {
        if (isIgnoredTopLevelFile(lowercaseFilePath)) {
            continue;
        }
        // First we check for specific actors that have configs in /actors or standalone actors in /standalone-actors
        // This matches both actors/username_actorName and standalone-actors/username_actorName
        const changedActorConfigMatch = lowercaseFilePath.match(/^(?:standalone-)?actors\/([^/]+)\/.+/);
        if (changedActorConfigMatch) {
            const sanitizedActorName = changedActorConfigMatch[1].replace('_', '/');
            const actorConfigChanged = actorConfigs.find(({ actorName }) => actorName.toLowerCase() === sanitizedActorName);
            if (actorConfigChanged === undefined) {
                log.warning('changes was found in an actor folder which no longer exists in the current commit', {
                    actorName: sanitizedActorName,
                    actorFolderName: changedActorConfigMatch[1],
                });
                continue;
            }

            console.log(`actorConfigChanged ${actorConfigChanged.actorName}: sanitizedActorName ${sanitizedActorName} ${lowercaseFilePath} `);
            // These can be nested at various folders inside the actor folder
            if (isLatest || !isLatestBuildOnlyFile(lowercaseFilePath)) {
                // We assume other files will are either actor.json or input_schema.json and those needs to be tested
                // TODO: Check what changed in schema, we don't need to test description changes
                actorsChangedMap.set(actorConfigChanged.folder, actorConfigChanged);
            }
            continue;
        }

        // We check top level files (formerly in /code and /shared folders) that are shared among all non-standalone Actors
        // Standalone actors are always handled separately by name via changedActorConfigMatch
        if (isLatest || !isLatestBuildOnlyFile(lowercaseFilePath)) {
            codeChanged = !isLatest; // NOTE: code is changed only in PR
            for (const actorConfig of actorConfigsWithoutStandalone) {
                actorsChangedMap.set(actorConfig.folder, actorConfig);
            }
        }
    }

    const actorsChanged = Array.from(actorsChangedMap.values());

    // All below here is just for logging
    const ignoredFilesChanged = lowercaseFiles.filter((file) => isIgnoredTopLevelFile(file));
    log.info(`[DIFF]: Top level files changed that we ignore (don't trigger test or build): ${ignoredFilesChanged.join(', ')}`);

    const onlyLatestFilesChanged = lowercaseFiles.filter((file) => isLatestBuildOnlyFile(file));
    log.info(`[DIFF]: Files changed that only trigger latest build: ${onlyLatestFilesChanged.join(', ')}`);

    if (!isLatest && codeChanged) {
        log.info(`[DIFF]: All non-standalone Actors need to be built and tested (changes in top-level code)`);
    }

    if (actorsChanged.length > 0) {
        const miniactors = actorsChanged.filter((config) => !config.isStandalone).map((config) => config.actorName);
        const standaloneActors = actorsChanged.filter((config) => config.isStandalone).map((config) => config.actorName);
        log.info(`[DIFF]: MiniActors to be built and tested: ${miniactors.join(', ')}`);
        log.info(`[DIFF]: Standalone Actors to be built and tested: ${standaloneActors.join(', ')}`);
    } else {
        log.info(`[DIFF]: No relevant files changed, skipping builds and tests`);
    }

    return {
        actorsChanged,
        codeChanged,
    };
};
