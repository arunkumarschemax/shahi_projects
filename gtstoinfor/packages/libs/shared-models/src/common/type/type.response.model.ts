import { GlobalResponseObject } from "../global-response-object";
import { TypeModel } from "./type.model";



export class TypeResponseModel extends GlobalResponseObject {
    data?: TypeModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: TypeModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

