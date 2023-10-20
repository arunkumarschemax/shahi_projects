import { GlobalResponseObject } from "../global-response-object";
import { BusinessAreaModel } from "./business-area-model";


export class BusinessAreaResponseModel extends GlobalResponseObject {
    data?: BusinessAreaModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: BusinessAreaModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

