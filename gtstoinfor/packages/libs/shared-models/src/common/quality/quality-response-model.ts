import { GlobalResponseObject } from "../global-response-object";
import { QualityDTO } from "./quality-dto";





export class QualityResponseModel extends GlobalResponseObject {
    data? : QualityDTO[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: QualityDTO[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}