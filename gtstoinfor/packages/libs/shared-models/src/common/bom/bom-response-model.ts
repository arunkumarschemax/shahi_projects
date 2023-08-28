import { GlobalResponseObject } from "../global-response-object";
import { BomRequest } from "./bom-request";


export class CompanyResponseModel extends GlobalResponseObject{
    data?: BomRequest;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BomRequest) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
