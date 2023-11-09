
import { GlobalResponseObject } from "../global-response-object";
import { FgDataModel } from "./fgdata-model";
import { SubstituionModel } from "./substituion.model";


export class SubResponseModel extends GlobalResponseObject {
    data?: FgDataModel;

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FgDataModel){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

