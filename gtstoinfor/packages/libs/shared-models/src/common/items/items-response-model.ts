import { GlobalResponseObject } from "../global-response-object";
import {  ItemsDto } from "./items-request";

export class ItemsResponseModel extends GlobalResponseObject{
    data?: ItemsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
