
import { GlobalResponseObject } from '../global-response-object';
import { ItemSubCategoryDropDownDto } from './item-sub-categories-drop-down.dto';


export class ItemSubCategoriesDropDownResponse extends GlobalResponseObject {
    data?: ItemSubCategoryDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemSubCategoryDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

