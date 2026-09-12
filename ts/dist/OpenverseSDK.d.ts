import { AudioEntity } from './entity/AudioEntity';
import { ImageEntity } from './entity/ImageEntity';
import { OAuth2ApplicationEntity } from './entity/OAuth2ApplicationEntity';
import { OAuth2KeyInfoEntity } from './entity/OAuth2KeyInfoEntity';
import { OAuth2TokenEntity } from './entity/OAuth2TokenEntity';
export type * from './OpenverseTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpenverseEntityBase } from './OpenverseEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OpenverseSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Audio(entopts?: Record<string, any>): AudioEntity;
    Image(entopts?: Record<string, any>): ImageEntity;
    OAuth2Application(entopts?: Record<string, any>): OAuth2ApplicationEntity;
    OAuth2KeyInfo(entopts?: Record<string, any>): OAuth2KeyInfoEntity;
    OAuth2Token(entopts?: Record<string, any>): OAuth2TokenEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpenverseSDK;
    tester(testopts?: any, sdkopts?: any): OpenverseSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpenverseSDK;
export { stdutil, config, BaseFeature, OpenverseEntityBase, OpenverseSDK, SDK, };
