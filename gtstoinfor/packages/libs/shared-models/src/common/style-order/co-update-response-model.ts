
import { GlobalResponseObject } from "../global-response-object";
import { CoUpdateReq } from "./co-update-req";


export class CoUpdateResponseModel extends GlobalResponseObject {
    data?: CoUpdateReq;

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CoUpdateReq){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

