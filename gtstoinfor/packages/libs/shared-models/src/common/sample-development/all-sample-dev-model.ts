import { GlobalResponseObject } from "../global-response-object";
import { SampleDevDto } from "./sample-dev-dto";

export class AllSampleDevReqResponseModel extends GlobalResponseObject {
    data?: SampleDevDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleDevDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

