import { GlobalResponseObject } from "../global-response-object";
import { RackDTO } from "./rack-dto";




export class AllRackResponseModel extends GlobalResponseObject {
    data? : RackDTO[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: RackDTO[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}