import { GlobalResponseObject } from "../global-response-object";
import { FabricContentdto } from "./fabricContent.dto";

export class FabricContentResponseModel extends GlobalResponseObject {
    data? : FabricContentdto[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: FabricContentdto[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}