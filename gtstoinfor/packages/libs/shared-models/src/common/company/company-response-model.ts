import { GlobalResponseObject } from "../global-response-object";
import { CompanyDto } from "./company-request";


export class CompanyResponseModel extends GlobalResponseObject{
    data?: CompanyDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CompanyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: CompanyDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
