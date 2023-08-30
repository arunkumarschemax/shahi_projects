import { GlobalResponseObject } from "../global-response-object";
import { SampleTypesDto } from "./sample-types.dto";

export class SampleTypesResponseModel extends GlobalResponseObject{
    data?: SampleTypesDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleTypesDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}