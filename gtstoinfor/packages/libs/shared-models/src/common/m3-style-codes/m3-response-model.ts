import { GlobalResponseObject } from "../global-response-object";
import { M3StyleDTO } from "./m3-dto";


export class M3StyleResponseModel extends GlobalResponseObject {
    data? : M3StyleDTO[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: M3StyleDTO[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}