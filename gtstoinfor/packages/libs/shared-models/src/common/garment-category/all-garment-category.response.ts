import { GlobalResponseObject } from '../global-response-object';
import { GarmentCategoryDto } from './garment-category.dto';

export class AllGarmentCategoryResponse extends GlobalResponseObject{
    data?: GarmentCategoryDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: GarmentCategoryDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}