import { SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { GlobalResponseObject } from "../global-response-object";


export class ProductStructureResponseModel extends GlobalResponseObject{
    data?: SMVEfficiencyRequest;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: SMVEfficiencyRequest) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
