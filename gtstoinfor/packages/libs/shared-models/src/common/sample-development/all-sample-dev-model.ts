import { GlobalResponseObject } from "../global-response-object";
import { SampleDevelopmentRequest } from "./sample-development-request";

export class AllSampleDevReqResponseModel extends GlobalResponseObject {
    data?: SampleDevelopmentRequest[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleDevelopmentRequest[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

