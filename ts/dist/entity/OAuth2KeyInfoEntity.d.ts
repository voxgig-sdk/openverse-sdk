import { OpenverseEntityBase } from '../OpenverseEntityBase';
import type { OpenverseSDK } from '../OpenverseSDK';
import type { Control } from '../types';
import type { OAuth2KeyInfo, OAuth2KeyInfoLoadMatch } from '../OpenverseTypes';
declare class OAuth2KeyInfoEntity extends OpenverseEntityBase<OAuth2KeyInfo> {
    constructor(client: OpenverseSDK, entopts: any);
    make(this: OAuth2KeyInfoEntity): OAuth2KeyInfoEntity;
    load(this: any, reqmatch?: OAuth2KeyInfoLoadMatch, ctrl?: Control): Promise<OAuth2KeyInfoEntity>;
}
export { OAuth2KeyInfoEntity };
