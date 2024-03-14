import { GlobalResponseObject } from "../global-response-object";
import { ThreadsDto } from "./threads.requests";

export class ThreadsResponseModel extends GlobalResponseObject{
    data?: ThreadsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: ThreadsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
