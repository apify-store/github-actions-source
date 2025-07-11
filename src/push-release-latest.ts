import log from '@apify/log';
import { ApifyClient } from 'apify-client';
import type { ActorConfig, GitHubEventPush } from './types.js';
import { getEnvVar, getLastCommitAdditions, getLastCommitAffectedFiles } from './utils.js';
import { StateController } from './state.js';
import { deleteOldBuilds, runBuilds } from './build.js';

/**
 * Build all miniactors to latest and publish changelog update to Slack channel
 */
const buildLatest = async (buildLatestActors: ActorConfig[], stateController: StateController) => {
    await runBuilds(stateController, buildLatestActors);
};

const notifyToSlack = async (stateController: StateController) => {
    const githubEvent = stateController.buildTestState.githubEvent as GitHubEventPush;

    // We could parse the head_commit diff but we would need to use git separately
    // So parsing it from file is easier
    const addedChangelogText = getLastCommitAdditions('CHANGELOG.md');

    log.info(`New changelog entries: ${addedChangelogText}`);

    if (!addedChangelogText) {
        log.warning('No new changelog entries found, haven\'t you forgotten to update it?');
    }

    const capitalize = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());
    const website = capitalize(githubEvent.repository.full_name.split('/')[1].replace('store-', ''));
    const { author, message } = githubEvent.head_commit;
    const shortMessage = `${website} was released (by ${author.name}) with the following changes:\n${addedChangelogText}\n`;

    // This one is just for broader public that only cares about public facing changes
    if (addedChangelogText) {
        await stateController.getTesterApifyClient().actor('katerinahronik/slack-message').call(
            {
                channel: '#delivery-public-actors',
                text: shortMessage,
                token: 'xoxb-19871495652-7454715042834-joUHdJeyKq0QqIPs2bq9Av8I',
            },
            { waitSecs: 0 },
        );
    }

    // head_commit from webhook has changed files but event from actions doesn't for some reason
    // so we have to parse it from the checked out repo
    // https://github.blog/changelog/2019-10-16-changes-in-github-actions-push-event-payload/
    const changedFiles = getLastCommitAffectedFiles(githubEvent);
    const longMessage = `${website} was released with the following changes:\n${addedChangelogText}\n`
        + `Author: ${author.name}.\nCommit message: ${message}\nFiles changed: ${changedFiles.join(', ')}`;

    // This one is for devs and project managers that need to know more details
    const notifChannel = `#notif-${website.toLowerCase()}`;
    log.info(`Sending slack message to channel: ${notifChannel}. Message: ${longMessage}`);

    await stateController.getTesterApifyClient().actor('katerinahronik/slack-message').call(
        {
            channel: notifChannel,
            text: longMessage,
            token: 'xoxb-19871495652-7454715042834-joUHdJeyKq0QqIPs2bq9Av8I',
        },
        { waitSecs: 0 },
    );
};

/**
 * We will read all Actors in the circ_le account and build those that match by name pattern
 * There are many ways to approach this, a more robust one would be to have a map of Actors
 * which would allow to have more than one special user per Actor
 * But since that use-case might never be needed, I went with the simplest solution that doesn't require maintaining the map
 * NOTE: One issue is that if any Actor is renamed, we will not match it in the circ_le account nor throw any error
 */
const buildCircleApifyManaged = async (actorConfigs: ActorConfig[], stateController: StateController) => {
    // This token is hardcoded in the runner Actor, locally you have to inject it
    const client = new ApifyClient({ token: getEnvVar('APIFY_TOKEN_CIRC_LE') });

    const { items: circleActors } = await client.actors().list();

    const actorsToBuild = circleActors.map((circleActor) => {
        // They prefix all with apify-managed---, I communicated with Jacques to keep doing that
        let actorConfigFound = actorConfigs.find((actorConfig) => circleActor.name.replace('apify-managed---', '') === actorConfig.actorName.split('/')[1]);

        // Hack for bad naming of circ_le/apify-managed-google-search, we don't want to rename now to break customers
        if (!actorConfigFound && circleActor.name === 'apify-managed-google-search') {
            actorConfigFound = actorConfigs.find((actorConfig) => actorConfig.actorName.split('/')[1] === 'google-search-scraper');
        }

        if (actorConfigFound) {
            return {
                // We point the circle Actor to the repo folder
                actorName: `${circleActor.username}/${circleActor.name}`,
                folder: actorConfigFound.folder,
                isStandalone: actorConfigFound.isStandalone,
            };
        }
        return undefined;
    }).filter((config) => config !== undefined);

    log.info(`Found ${actorsToBuild.length} circ_le actors that match Actors we built out of total ${circleActors.length} circ_le actors`);
    log.info(`All circ_le actors: ${circleActors.map((actor) => actor.name).join(', ')}`);
    log.info(`circ_le Actors to build: ${actorsToBuild.map((actor) => actor.actorName).join(', ')}`);

    if (actorsToBuild.length === 0) {
        log.info('No circ_le actors to build');
        return;
    }

    await runBuilds(stateController, actorsToBuild);
};

export const pushToBuildLatest = async (actorConfigs: ActorConfig[], stateController: StateController) => {
    await buildLatest(actorConfigs, stateController);
    await buildCircleApifyManaged(actorConfigs, stateController);

    // Note: Typecasting is not ideal, it would be better if state controller was aware of the context but not worth to refactor now
    await notifyToSlack(stateController); 
    // We only delete old builds if we successfully released latest build
    await deleteOldBuilds(actorConfigs);
};
