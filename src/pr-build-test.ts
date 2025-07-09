import { log } from 'apify';
import { ActorRun } from 'apify-client';

import type { BuildData } from './types.js';
import { formatBuildNumsAndIdsForTesting, type GetChangedActorsResult, getRepoName } from './utils.js';
import type { StateController } from './state.js';
import { runBuilds } from './build.js';

const runTests = async (stateController: StateController, testTasks: string[], buildDataArr: BuildData[]): Promise<ActorRun[]> => {
    log.info(`[TEST] Running ${testTasks.length} tests`);
    const testRuns = await Promise.all(testTasks.map(async (testTaskName) => {
        const persistedTestRunId = stateController.buildTestState.testRuns[testTaskName];
        if (persistedTestRunId) {
            log.info(`[TEST] found existing test run of task ${testTaskName}, run ID: ${persistedTestRunId}. `
                + `will just wait for it to finish`);
            return { runId: persistedTestRunId, testTaskName };
        }

        const { buildIds, buildNums } = formatBuildNumsAndIdsForTesting(buildDataArr);

        // Starts task of pocesar/actor-testing that is autodeployed after push to store-tests repo
        const { id: runId } = await stateController.getTesterApifyClient().task(testTaskName).start({
            customData: {
                // See description of the function how this should work, weird name is for backwards compatibility
                build: buildNums,
                buildIds,
            },
            slackToken: '', // disable slack notifications
        });
        log.info(`[TEST] Started a test task ${testTaskName}, run ID: ${runId}`);
        stateController.saveTestRun(testTaskName, runId);
        return { runId, testTaskName };
    }));

    log.info(`[TEST] persisting test run IDs in KVS`);
    await stateController.persistBuildAndTestRuns();

    const finishedTests = await Promise.all(testRuns.map(async ({ runId, testTaskName }) => {
        const testRun = stateController.getTesterApifyClient().run(runId);
        const testResult = await testRun.waitForFinish();
        log.info(`[TEST] Test task finished $${testTaskName}, run ID: ${runId}, status: ${testResult.status}`);
        return testResult;
    }));

    const failedTests = finishedTests.filter((test) => test.status !== 'SUCCEEDED');
    return failedTests;
};

export const pullRequestToBuildAndTest = async (
    { actorsChanged, codeChanged }: GetChangedActorsResult,
    stateController: StateController,
) => {
    const buildDataArr = await runBuilds(stateController, actorsChanged);
    log.info(`[BUILD] All builds finished`);

    const allTasks = (await stateController.getTesterApifyClient().tasks().list()).items;
    // We only care about testing Actor tasks
    const TESTING_ACTOR_ID = '5lngKwZTb2YvJNNhW';
    const allTestTasks = allTasks.filter((task) => task.actId === TESTING_ACTOR_ID);

    const repoName = getRepoName(stateController.buildTestState.githubEvent);
    const repoRegExp = RegExp(`\\b${repoName.replace(/^store-/, '')}\\b`);

    const hasAnyNonStandaloneChanged = !!actorsChanged.some(({ isStandalone }) => !isStandalone);
    const standaloneChangedActors = actorsChanged.filter(({ isStandalone }) => isStandalone);

    // NOTE: We have several assumptions how test tasks must be named
    // 1. Non-standalone must contain the repo name in their name
    // 2. Standalone tests must contain 'standalone' in their name
    // 3. Standalone tests must have the same name as the Actor they are testing
    // 4. Core tests must have 'core' in their name
    // 5. TODO: Core tests allow to run only selected miniactors (not a hard requirement, just a tiny optimization)
    const testTasksForRepo = allTestTasks.filter((task) => {
        const isStandaloneTask = /\bstandalone\b/.test(task.name);
        const matchesCodeChanged = !isStandaloneTask && codeChanged && task.name.match(repoRegExp);

        // Test only core test for a repo
        // TODO: Pass input to only run specific miniactors in the core test
        const matchesCoreTest = hasAnyNonStandaloneChanged && task.name.match(repoRegExp) && /\bcore\b/.test(task.name);

        const matchesStandalone = isStandaloneTask
            && standaloneChangedActors.some(({ actorName }) => task.name.includes(actorName.split('/')[1]));

        return matchesCodeChanged || matchesCoreTest || matchesStandalone;
    });

    const testTasksToRun = testTasksForRepo
        .map(({ name, username }) => `${username}/${name}`);

    log.info(`[TEST]: Total tasks on account: ${allTasks.length}. Total test tasks on account: ${allTestTasks.length}. `
        + `Total core test tasks to run: ${allTestTasks.filter(({ name }) => name.includes('core')).length}. `
        + `Total standalone test tasks: ${allTestTasks.filter(({ name }) => name.includes('standalone')).length}`);

    log.info(`[TEST] Found ${testTasksForRepo.length} actor tests to run for the repo `
        + `and ${testTasksForRepo.filter(({ name }) => name.includes('standalone')).length} standalone tests to run.`);

    log.info(`[TEST] Test tasks to run: ${testTasksToRun.join(', ')}`);

    const failedTests = await runTests(stateController, testTasksToRun, buildDataArr);

    let prErrorMessage: string | undefined;
    // Fail if we have Actors to test but we don't have any tests set up, we should have at least one test task
    if ((actorsChanged.length > 0 || codeChanged) && testTasksToRun.length === 0) {
        prErrorMessage = `[TEST] No test tasks found for the changed actors, please set up the tests, we want at least one test`;
    }

    const numFailed = failedTests.length;
    if (numFailed > 0) {
        log.warning(`[TEST] ${numFailed} tests failed:`);
        for (const failedTest of failedTests) {
            log.warning(`[TEST]     - https://console.apify.com/actors/runs/${failedTest.id}`);
        }
        prErrorMessage = `[TEST] ${numFailed} tests failed`;
    }

    return { prErrorMessage };
};
