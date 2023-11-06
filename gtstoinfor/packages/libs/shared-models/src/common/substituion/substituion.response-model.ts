
import { GlobalResponseObject } from "../global-response-object";
import { SubstituionModel } from "./substituion.model";


export class SubstituionResponseModel extends GlobalResponseObject {
    data?: SubstituionModel;

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SubstituionModel){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

