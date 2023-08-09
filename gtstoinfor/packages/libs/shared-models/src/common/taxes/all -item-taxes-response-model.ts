import { GlobalResponseObject } from "../global-response-object";
import { TaxesDto } from "./taxes.dto";


export class AllTaxesResponseModel extends GlobalResponseObject {
    data?:  TaxesDto[];

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: TaxesDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}

