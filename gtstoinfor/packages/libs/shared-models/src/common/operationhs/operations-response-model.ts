import { GlobalResponseObject } from "../global-response-object";
import { OperationsDTO } from "./operations-request";

export class OperationsResponseModel extends GlobalResponseObject{
    data?: OperationsDTO[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //OperationsDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationsDTO[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
