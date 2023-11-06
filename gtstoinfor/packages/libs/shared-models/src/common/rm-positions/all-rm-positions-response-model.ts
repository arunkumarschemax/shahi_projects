import { GlobalResponseObject } from "../global-response-object";
import { RackPositionDTO } from "./rm-positions-dto";


export class AllRMPositionResponseModel extends GlobalResponseObject {
    data? : RackPositionDTO[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: RackPositionDTO[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}