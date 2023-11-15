import { GlobalResponseObject } from "../global-response-object";
import { M3ItemsDTO } from "./m3-items-dto";



export class M3StyleResponseModel extends GlobalResponseObject {
    data? : M3ItemsDTO[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: M3ItemsDTO[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}