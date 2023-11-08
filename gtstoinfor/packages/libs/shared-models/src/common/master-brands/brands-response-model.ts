import { GlobalResponseObject } from "../global-response-object";
import { MasterBrandsDto } from "./master-request";

export class MasterBrandsResponseModel extends GlobalResponseObject{
    data?: MasterBrandsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //MasterBrandsDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: MasterBrandsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
