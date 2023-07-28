import { GlobalResponseObject } from "../global-response-object";
import { ItemSubCategoriesDto } from "./item-sub-categories.dto";

export class ItemSubCategoryResponse extends GlobalResponseObject{
      data?: ItemSubCategoriesDto;
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: ItemSubCategoriesDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}