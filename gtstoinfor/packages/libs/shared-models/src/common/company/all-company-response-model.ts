import { GlobalResponseObject } from "../global-response-object";
import { CompanyDto } from "./company-request";



export class AllCompanyResponseModel extends GlobalResponseObject {
    data?: CompanyDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CompanyDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

