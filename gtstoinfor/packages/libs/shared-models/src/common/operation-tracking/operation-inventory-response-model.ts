import { GlobalResponseObject } from "../global-response-object";
import { OperationInventoryDto } from "./operation-inventory-dto";


export class OperationInventoryResponseModel extends GlobalResponseObject {
    data?: OperationInventoryDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationInventoryDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
