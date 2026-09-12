import { OpenverseEntityBase } from '../OpenverseEntityBase';
import type { OpenverseSDK } from '../OpenverseSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch, ImageListMatch, ImageCreateData } from '../OpenverseTypes';
declare class ImageEntity extends OpenverseEntityBase<Image> {
    constructor(client: OpenverseSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
    create(this: any, reqdata?: ImageCreateData, ctrl?: Control): Promise<ImageEntity>;
}
export { ImageEntity };
