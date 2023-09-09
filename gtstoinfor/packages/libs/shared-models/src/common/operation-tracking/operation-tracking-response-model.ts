import { GlobalResponseObject } from "../global-response-object";


export class OperationTrackingResponseModel extends GlobalResponseObject {
    data?: any;

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: any){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
