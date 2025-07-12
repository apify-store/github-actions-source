import { ActorTaggedBuild } from 'apify-client';
import type { ActorConfig, BuildData } from './types.js';
import { StateController } from './state.js';
declare module 'apify-client' {
    interface ActorTaggedBuilds extends Record<string, ActorTaggedBuild> {
    }
}
export declare const runBuilds: (state: StateController, actorConfigs: ActorConfig[]) => Promise<BuildData[]>;
export declare const deleteOldBuilds: (actorConfigs: ActorConfig[]) => Promise<void>;
