
import { GlobalResponseObject } from '../global-response-object';
import { GarmentDropDownDto } from './garments-drop-down.dto';


export class GarmentsDropDownResponse extends GlobalResponseObject {
    data?: GarmentDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: GarmentDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

