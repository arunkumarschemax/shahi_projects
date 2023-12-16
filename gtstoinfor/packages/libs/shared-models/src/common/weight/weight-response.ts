import { GlobalResponseObject } from "../global-response-object";
import { weightModel } from "./weight-model";


export class WeightResponseModel extends GlobalResponseObject {
    data?: weightModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: weightModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

