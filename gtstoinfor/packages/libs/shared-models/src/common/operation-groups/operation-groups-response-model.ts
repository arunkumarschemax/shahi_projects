import { GlobalResponseObject } from "../global-response-object";
import { OperationGroupsDto } from "./operation-groups.dto";

export class OperationGroupsResponseModel extends GlobalResponseObject{
    data?: OperationGroupsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //CurrencyDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationGroupsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}