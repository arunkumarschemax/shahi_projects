import { GlobalResponseObject } from '../global-response-object';
import { ItemCreationDTO } from './item-creation.dto';

export class ItemcreationResponseModel extends GlobalResponseObject{
    data?: ItemCreationDTO[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: ItemCreationDTO[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
