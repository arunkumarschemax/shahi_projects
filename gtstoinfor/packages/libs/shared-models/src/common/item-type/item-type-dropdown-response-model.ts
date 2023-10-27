
import { GlobalResponseObject } from '../global-response-object';
import { ItemTypeDropDownDto } from './item-type-dropdown';


export class ItemTypeDropDownResponse extends GlobalResponseObject {
    data?: ItemTypeDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemTypeDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

