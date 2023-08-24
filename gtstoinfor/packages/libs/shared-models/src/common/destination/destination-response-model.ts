import { GlobalResponseObject } from "../global-response-object";
import { DestinationDto } from "./destination-request";

export class DestinationResponseModel extends GlobalResponseObject{
    data?: DestinationDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DestinationDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: DestinationDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
