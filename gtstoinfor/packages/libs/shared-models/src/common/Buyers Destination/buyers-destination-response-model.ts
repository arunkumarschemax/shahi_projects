import { GlobalResponseObject } from "../global-response-object";
import { MappingResponseModel } from "./response-model";

export class BuyersDestinationResponseModel extends GlobalResponseObject{
    data?: MappingResponseModel[];
    buyerDetails: any;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: MappingResponseModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}