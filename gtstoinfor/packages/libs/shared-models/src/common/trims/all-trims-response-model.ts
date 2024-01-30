import { GlobalResponseObject } from "../global-response-object";
import { TrimsDto } from "./trims.dto";

export class AllTrimsResponsibleModel extends GlobalResponseObject {
    data? : TrimsDto[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: TrimsDto[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}