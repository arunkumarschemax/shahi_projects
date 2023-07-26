import { GlobalResponseObject } from "../global-response-object";
import { CurrencyDto } from "./currency-request";


export class AllCurrencyResponseModel extends GlobalResponseObject {
    data?: CurrencyDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CurrencyDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

