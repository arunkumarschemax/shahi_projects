
import { GlobalResponseObject } from '../global-response-object';
import { ItemCategoryDropDownDto } from './item-categories-drop-down.dto';


export class ItemCategoriesDropDownResponseModel extends GlobalResponseObject {
    data?: ItemCategoryDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemCategoryDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

