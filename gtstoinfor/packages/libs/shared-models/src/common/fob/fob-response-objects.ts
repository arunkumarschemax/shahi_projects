import { GlobalResponseObject } from "../global-response-object";
import { Fobdto } from "./fob.dto";

export class FobResponseModel extends GlobalResponseObject {
    data? : Fobdto[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: Fobdto[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}