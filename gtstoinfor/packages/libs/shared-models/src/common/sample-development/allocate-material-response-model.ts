import { GlobalResponseObject } from "../global-response-object";
import { AllocateMaterial } from "./allocate-material-request";
import { SampleDevDto } from "./sample-dev-dto";

export class AllocateMaterialResponseModel extends GlobalResponseObject {
    data?: AllocateMaterial[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: AllocateMaterial[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

