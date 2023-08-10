import { GlobalResponseObject } from "../global-response-object";
import { SampleSubTypesDTO } from "./sample-sub-types.dto";

export class SampleSubTypesResponseModel extends GlobalResponseObject{
    data?: SampleSubTypesDTO[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //OperationsDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleSubTypesDTO[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
