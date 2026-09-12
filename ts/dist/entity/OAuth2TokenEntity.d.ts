import { OpenverseEntityBase } from '../OpenverseEntityBase';
import type { OpenverseSDK } from '../OpenverseSDK';
import type { Control } from '../types';
import type { OAuth2Token, OAuth2TokenCreateData } from '../OpenverseTypes';
declare class OAuth2TokenEntity extends OpenverseEntityBase<OAuth2Token> {
    constructor(client: OpenverseSDK, entopts: any);
    make(this: OAuth2TokenEntity): OAuth2TokenEntity;
    create(this: any, reqdata?: OAuth2TokenCreateData, ctrl?: Control): Promise<OAuth2TokenEntity>;
}
export { OAuth2TokenEntity };
