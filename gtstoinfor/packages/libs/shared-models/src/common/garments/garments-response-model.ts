import { GlobalResponseObject } from "../global-response-object";
import { GarmentsDto } from "./garments-request";

export class GarmentResponseModel extends GlobalResponseObject{
    data?: GarmentsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: GarmentsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
