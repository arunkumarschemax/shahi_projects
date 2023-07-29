import { GlobalResponseObject } from "../global-response-object";
import { OperationsDTO } from "./operations-request";


export class AllOperationsResponseModel extends GlobalResponseObject {
    data?: OperationsDTO[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationsDTO[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

