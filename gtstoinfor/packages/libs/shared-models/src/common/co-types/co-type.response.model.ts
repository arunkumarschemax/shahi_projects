import { GlobalResponseObject } from "../global-response-object";
import { CoTypeModel } from "./co-type.model";


export class CoTypeResponseModel extends GlobalResponseObject {
    data?: CoTypeModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CoTypeModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

