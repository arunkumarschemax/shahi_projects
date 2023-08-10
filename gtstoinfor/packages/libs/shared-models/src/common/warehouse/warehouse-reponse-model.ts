import { GlobalResponseObject } from "../global-response-object";
import { WarehouseDto } from "./warehouse-request";

export class WarehouseResponseModel extends GlobalResponseObject{
    data?: WarehouseDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //WarehouseDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: WarehouseDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
