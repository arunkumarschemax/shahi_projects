
import { ItemSubCategoriesDto } from '.';
import { GlobalResponseObject } from '../global-response-object';


export class AllItemSubCategoryResponse extends GlobalResponseObject{
    data?: ItemSubCategoriesDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: ItemSubCategoriesDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

