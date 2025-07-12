import { type GetChangedActorsResult } from './utils.js';
import type { StateController } from './state.js';
export declare const pullRequestToBuildAndTest: ({ actorsChanged, codeChanged }: GetChangedActorsResult, stateController: StateController) => Promise<{
    prErrorMessage: string | undefined;
}>;
