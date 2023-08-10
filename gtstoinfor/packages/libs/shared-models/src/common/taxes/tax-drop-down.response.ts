import { GlobalResponseObject } from "../global-response-object";
import { TaxDropDownDto } from "./tax-drop-down.dto";

export class TaxDropDownResponse extends GlobalResponseObject {
    data?: TaxDropDownDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: TaxDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}
