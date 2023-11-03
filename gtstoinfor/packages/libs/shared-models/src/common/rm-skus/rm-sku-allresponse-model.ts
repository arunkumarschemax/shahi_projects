import { GlobalResponseObject } from "../global-response-object";
import { RmSkuModel } from "./rm-skus-model";


export class RmSkuResponseModel extends GlobalResponseObject {
    data: RmSkuModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data: RmSkuModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}