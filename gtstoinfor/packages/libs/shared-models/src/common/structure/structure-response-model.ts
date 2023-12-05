import { GlobalResponseObject } from "../global-response-object";
import { StructureModel } from "./structure-model";


export class StructureResponseModel extends GlobalResponseObject {
    data?: StructureModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: StructureModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

