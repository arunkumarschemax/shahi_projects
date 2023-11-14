import { GlobalResponseObject } from "../global-response-object";
import { bomRequest } from "./bom-request";
// import { BomRequest } from "./bom-request";


export class BomTrimResponseModel extends GlobalResponseObject{
    data?: bomRequest;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: bomRequest) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
