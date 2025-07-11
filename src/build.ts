import { ACTOR_SOURCE_TYPES } from '@apify/consts';
import log from '@apify/log';
import { Build, ActorTaggedBuild, ApifyClient } from 'apify-client';
import type { ActorConfig, BuildData } from './types.js';
import { StateController } from './state.js';

// Patching buggy type in ApifyClient (already fixed in master)
declare module 'apify-client' {
    interface ActorTaggedBuilds extends Record<string, ActorTaggedBuild> { }
}

type BuildPrActorOptions = {
    buildTag: string | null
    versionNumber: string
    gitRepoUrl: string
}
class ApifyBuilder {
    // eslint-disable-next-line no-empty-function
    private constructor(private readonly apifyClient: ApifyClient, private readonly actorName: string) { }

    // Usually 'latest' but not necessarily (can be e.g. 'version-0')
    getDefaultVersionAndTag = async (): Promise<{ defaultBuildNumber: string, defaultVersionNumber: string, defaultBuildTag: string }> => {
        const actorClient = this.apifyClient.actor(this.actorName);
        const actorInfo = await actorClient.get();

        if (!actorInfo) {
            throw new Error(`[${this.actorName}] not found. It is not published or we are missing token to access it privately or its name is misspelled`);
        }

        const defaultBuildTag = actorInfo.defaultRunOptions.build;
        log.info(`Default build tag for ${this.actorName} is ${defaultBuildTag}`);

        // We could technically allow this but in most cases this is accidentally set wrongly and there is a workaround
        if (defaultBuildTag.match(/\d+\.\d+\.\d+/)) {
            throw new Error(`[${this.actorName}] Default build is a build number, not a tag. While this could work, `
                + `we want to have a default as tag so this is often an accidental misconfiguration from the dev`);
        }
        // I reported that buildNumber should probably not be optional
        const defaultBuildNumber = actorInfo.taggedBuilds![defaultBuildTag].buildNumber!;
        const defaultVersionNumber = defaultBuildNumber.match(/(\d+\.\d+)\.\d+/)![1];
        log.info(`Default version for ${this.actorName} is ${defaultVersionNumber}`);

        return { defaultBuildNumber, defaultVersionNumber, defaultBuildTag };
    };

    startActorBuild = async ({
        buildTag,
        versionNumber,
        gitRepoUrl,
    }: BuildPrActorOptions): Promise<BuildData> => {
        const actorClient = this.apifyClient.actor(this.actorName);
        const actorInfo = await actorClient.get();
        if (!actorInfo) {
            throw new Error(`No actor named '${this.actorName}' was found on the platform. If this`
                            + ' is unexpected, make sure the actor you are targeting is spelled the'
                            + ' same as the folder in the repository.');
        }

        // NOTE: I couldn't find this type, so I had to extract it :(
        type ActorVersion = Parameters<ReturnType<typeof actorClient.version>['update']>[0];
        const actorVersion: ActorVersion = {
            // @ts-expect-error Type should support null but only supports string | undefined
            buildTag,
            versionNumber,
            gitRepoUrl,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: coudn't find this type either :(
            sourceType: ACTOR_SOURCE_TYPES.GIT_REPO,
        };

        // Prepare version
        const versionExists = !actorInfo.versions.find((version) => version.versionNumber === versionNumber);
        if (versionExists) {
            // create new version
            await actorClient.versions().create(actorVersion);
        } else {
            const version = actorClient.version(versionNumber);
            await version.update(actorVersion);
        }

        log.info(`[BUILD][${this.actorName}]: Will be built with version ${versionNumber}`);

        // We also get back actId so the testing actor can both match by actor ID and name
        const { id, actId, buildNumber } = await actorClient.build(versionNumber);

        log.info(`[BUILD][${this.actorName}]: Build ${id} (${versionNumber}) has started`);
        return { buildId: id, actorId: actId, buildNumber, actorName: this.actorName };
    };

    waitForBuildToFinish = async (buildId: string, actorName: string): Promise<Build> => {
        log.info(`[BUILD][${actorName}]: Waiting for build ${buildId} to finish`);
        const build = await this.apifyClient.build(buildId).waitForFinish();
        const versionNumber = build.buildNumber;
        if (build.status === 'FAILED' || build.status === 'TIMED-OUT') {
            const message = `[BUILD][${actorName}]: Build ${buildId} (${versionNumber}) failed. `
                + `Not continuing with other builds and tests.`;
            log.warning(`D€LIV€RY_$L&CK: Webhook-to-build: ${message}`);
            throw new Error(message);
        }

        log.info(`[BUILD][${actorName}]: Build ${build.id} (${versionNumber}) finished successfully.`);
        return build;
    };

    /**
    * Create ApifyBuilder with actor owner's token
    */
    static fromActorName = (actorName: string): ApifyBuilder => {
        const username = actorName.split('/')[0];
        // GitHib secrets only allow word characters (alphanum + underscore)
        const usernameInGitHubSecretsFormat = username.replaceAll(/\W/g, '_').toUpperCase();
        const usernameEnvVar = `APIFY_TOKEN_${usernameInGitHubSecretsFormat}`;
        const token = process.env[usernameEnvVar];
        if (!token) {
            throw new Error(`Cannot find Apify API token for username: ${username}. `
                + `Have you set secret env var to this GitHub repo with key: ${usernameEnvVar}?`);
        }
        const apifyClient = new ApifyClient({ token });
        const builder = new ApifyBuilder(apifyClient, actorName);
        return builder;
    };

    /**
     * Deletes build of all versions. Apify API doesn't allow to delete default build and we explicitly skip it
     * We delete devel builds faster because we used the for every PR until recently so just to get rid of them faster
     */
    async deleteOldBuilds(): Promise<void> {
        // Even though we don't version our current Actors, if we ever such Actors to GitHub CI, we would accidentally delete old supported versions
        // This hardcoded solution is not ideal, but it should prevent most imaginable cases
        // All currently popular versioned Actors use `version-${number}` format
        const PROTECTED_TAGS_PREFIX = ['latest', 'v-', 'version', 'v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9'];

        // We don't want to be too short because we might to debug something
        // but also not too long because it increases the risk of users using outdated versions
        const DEFAULT_DAYS_BACK_PROD_VERSIONS = 30;
        const DEFAULT_DAYS_BACK_DEVEL = 7;

        const actorInfo = (await this.apifyClient.actor(this.actorName).get())!;

        // 'devel' used to be hardcoded for testing version 0.99, once we get rid of this tag everywhere, we can remove this code
        const taggedDevelBuildNumber: string | undefined = actorInfo.taggedBuilds!.devel?.buildNumber;

        const allTags = Object.keys(actorInfo.taggedBuilds ?? {});
        const protectedTags = allTags.filter((tag) => PROTECTED_TAGS_PREFIX.some((prefix) => tag.startsWith(prefix)));
        const protectedBuildNumbers = protectedTags.map((tag) => ({ buildNumber: actorInfo.taggedBuilds![tag]!.buildNumber, tag }));

        const { items } = (await this.apifyClient.actor(this.actorName).builds().list());

        // Deleting default build throws an error, so we skip it
        const { defaultBuildNumber, defaultBuildTag } = await ApifyBuilder.fromActorName(this.actorName).getDefaultVersionAndTag();

        const daysAgoUnixProd = Date.now() - DEFAULT_DAYS_BACK_PROD_VERSIONS * 24 * 60 * 60 * 1000;
        const daysAgoUnixDevel = Date.now() - DEFAULT_DAYS_BACK_DEVEL * 24 * 60 * 60 * 1000;

        // Fixing API client missing buildNumber field
        type CorrectBuildColletionItem = typeof items[0] & { buildNumber: string };
        const buildsToDelete = (items as CorrectBuildColletionItem[]).filter((build) => {
            if (build.buildNumber === defaultBuildNumber) {
                log.info(`[DELETE OLD BUILDS][${this.actorName}]: Skipping default build ${defaultBuildNumber} (${defaultBuildTag}). `
                    + `We never delete default builds`);
                return false;
            }

            const protectedTagFound = protectedBuildNumbers.find((protectedBuildNumber) => protectedBuildNumber.buildNumber === build.buildNumber);
            if (protectedTagFound) {
                log.info(`[DELETE OLD BUILDS][${this.actorName}]: Skipping protected build ${protectedTagFound.buildNumber} (${protectedTagFound.tag}).`);
                return false;
            }

            if (taggedDevelBuildNumber && build.buildNumber === taggedDevelBuildNumber) {
                const shouldDeleteDevelBuild = build.startedAt.getTime() < daysAgoUnixDevel;
                if (shouldDeleteDevelBuild) {
                    log.info(`[DELETE OLD BUILDS][${this.actorName}]: Removing olf devel build ${taggedDevelBuildNumber}.`);
                }
                return shouldDeleteDevelBuild;
            }
            return build.startedAt.getTime() < daysAgoUnixProd;
        });

        log.info(`[DELETE OLD BUILDS][${this.actorName}]: Deleting ${buildsToDelete.length} old builds that are non-default and `
            + `older than 30 days from total ${items.length}`);
        for (const build of buildsToDelete) {
            await this.apifyClient.build(build.id).delete();
        }
    }
}

export const runBuilds = async (state: StateController, actorConfigs: ActorConfig[]) => {
    const { githubEvent } = state.buildTestState;
    const sourceRef = githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.ref
        : githubEvent.ref.replace('refs/heads/', '');

    const startedBuilds = await Promise.all(actorConfigs.map(async ({ actorName, folder }) => {
        const persistedBuildData = state.buildTestState.builds[actorName];
        if (persistedBuildData) {
            log.info(`[BUILD] found existing build of ${actorName}: ${persistedBuildData.buildId}`);
            return persistedBuildData;
        }

        let versionNumber;
        let buildTag;

        if (githubEvent.type === 'pull_request') {
            versionNumber = '0.99';
            // We explicitly remove the tag. It used to be set to 'devel' but we don't want it to be selectable for users
            buildTag = null;
        } else {
            const { defaultVersionNumber, defaultBuildTag } = await ApifyBuilder.fromActorName(actorName).getDefaultVersionAndTag();
            versionNumber = defaultVersionNumber;
            buildTag = defaultBuildTag;
        }

        // Depending on if these are miniactors or standaloneActors
        let gitRepoUrl = `git@github.com:${githubEvent.repository.full_name}#${sourceRef}`;
        if (folder) {
            gitRepoUrl = `${gitRepoUrl}:${folder}`;
        }
        const builder = ApifyBuilder.fromActorName(actorName);
        const buildData = await builder.startActorBuild({ gitRepoUrl, versionNumber, buildTag });
        state.saveBuildAndActorId(buildData);
        return buildData;
    }));

    log.info(`[BUILD] persisting build IDs in KVS`);
    await state.persistBuildAndTestRuns();

    await Promise.all(startedBuilds.map(async (buildData) => {
        const builder = ApifyBuilder.fromActorName(buildData.actorName);
        await builder.waitForBuildToFinish(buildData.buildId, buildData.actorName);
    }));

    return startedBuilds;
};

export const deleteOldBuilds = async (actorConfigs: ActorConfig[]) => {
    for (const { actorName } of actorConfigs) {
        await ApifyBuilder.fromActorName(actorName).deleteOldBuilds();
    }
};
