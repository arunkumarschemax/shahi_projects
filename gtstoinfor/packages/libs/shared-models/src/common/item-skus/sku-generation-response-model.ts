import { GlobalResponseObject } from '../global-response-object';
import { ItemSKusModel } from './sku-generation.model';

export class SKUGenerationResponseModel extends GlobalResponseObject{
    data?: ItemSKusModel[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: ItemSKusModel[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
