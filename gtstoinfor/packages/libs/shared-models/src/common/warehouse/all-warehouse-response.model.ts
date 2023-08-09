import { GlobalResponseObject } from "../global-response-object";
import { WarehouseDto } from "./warehouse-request";


export class AllWarehouseResponseModel extends GlobalResponseObject {
    data?: WarehouseDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: WarehouseDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}