
import { GlobalResponseObject } from '../global-response-object';
import { ItemCategoriesDto } from './item-categories.dto';


export class AllItemCategoryResponse extends GlobalResponseObject{
    data?: ItemCategoriesDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: ItemCategoriesDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

