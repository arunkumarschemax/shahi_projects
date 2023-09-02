import { GlobalResponseObject } from '../global-response-object';
import { SKUGenerationModel } from './sku-generation.model';

export class SKUGenerationResponseModel extends GlobalResponseObject{
    data?: SKUGenerationModel[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: SKUGenerationModel[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
