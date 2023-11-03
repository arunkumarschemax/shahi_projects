import { FgRmMappingRequest, SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { GlobalResponseObject } from "../global-response-object";


export class FgRmMappingResponseModel extends GlobalResponseObject{
    data?: FgRmMappingRequest[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: FgRmMappingRequest[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
