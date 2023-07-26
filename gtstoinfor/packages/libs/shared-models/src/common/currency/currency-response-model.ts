import { GlobalResponseObject } from "../global-response-object";
import { CurrencyDto } from "./currency-request";

export class CurrencyResponseModel extends GlobalResponseObject{
    data?: CurrencyDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: CurrencyDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
