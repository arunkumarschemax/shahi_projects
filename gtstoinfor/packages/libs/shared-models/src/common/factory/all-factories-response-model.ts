import { GlobalResponseObject } from "../global-response-object";
import { FactoryDto } from "./factory.dto";

export class AllFactoriesResponseModel extends GlobalResponseObject {
    data? : FactoryDto[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: FactoryDto[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}