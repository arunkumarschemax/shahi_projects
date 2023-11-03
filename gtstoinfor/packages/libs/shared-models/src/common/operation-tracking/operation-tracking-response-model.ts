import { GlobalResponseObject } from "../global-response-object";
import { OperationTrackingDto } from "./operation-tracking-dto";


export class OperationTrackingResponseModel extends GlobalResponseObject {
    data?: OperationTrackingDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationTrackingDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
