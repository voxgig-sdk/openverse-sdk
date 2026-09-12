import { OpenverseEntityBase } from '../OpenverseEntityBase';
import type { OpenverseSDK } from '../OpenverseSDK';
import type { Control } from '../types';
import type { OAuth2Application, OAuth2ApplicationCreateData } from '../OpenverseTypes';
declare class OAuth2ApplicationEntity extends OpenverseEntityBase<OAuth2Application> {
    constructor(client: OpenverseSDK, entopts: any);
    make(this: OAuth2ApplicationEntity): OAuth2ApplicationEntity;
    create(this: any, reqdata?: OAuth2ApplicationCreateData, ctrl?: Control): Promise<OAuth2ApplicationEntity>;
}
export { OAuth2ApplicationEntity };
