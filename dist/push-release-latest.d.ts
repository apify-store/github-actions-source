import type { ActorConfig } from './types.js';
import { StateController } from './state.js';
export declare const pushToBuildLatest: (actorConfigs: ActorConfig[], stateController: StateController) => Promise<void>;
