import { OpenverseEntityBase } from '../OpenverseEntityBase';
import type { OpenverseSDK } from '../OpenverseSDK';
import type { Control } from '../types';
import type { Audio, AudioLoadMatch, AudioListMatch, AudioCreateData } from '../OpenverseTypes';
declare class AudioEntity extends OpenverseEntityBase<Audio> {
    constructor(client: OpenverseSDK, entopts: any);
    make(this: AudioEntity): AudioEntity;
    load(this: any, reqmatch?: AudioLoadMatch, ctrl?: Control): Promise<AudioEntity>;
    list(this: any, reqmatch?: AudioListMatch, ctrl?: Control): Promise<AudioEntity[]>;
    create(this: any, reqdata?: AudioCreateData, ctrl?: Control): Promise<AudioEntity>;
}
export { AudioEntity };
