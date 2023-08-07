
import { GlobalResponseObject } from '../global-response-object';
import { GarmentCategoryDropDownDto } from './garment-category-drop-down.dto';

export class GarmentCategoryDetailsResponse extends GlobalResponseObject{
    data?: GarmentCategoryDropDownDto;

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: GarmentCategoryDropDownDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}