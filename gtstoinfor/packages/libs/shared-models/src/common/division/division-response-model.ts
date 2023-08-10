import { GlobalResponseObject } from "../global-response-object";
import { DivisionDto } from "./division-request";


export class DivisionResponseModel extends GlobalResponseObject{
    data?: DivisionDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //divisionDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: DivisionDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
