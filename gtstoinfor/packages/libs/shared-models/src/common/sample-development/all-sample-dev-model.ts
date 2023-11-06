import { GlobalResponseObject } from "../global-response-object";
import { SampleDevelopmentRequest } from "./sample-development-request";

export class AllSampleDevReqResponseModel extends GlobalResponseObject {
    data?: any[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: any[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

