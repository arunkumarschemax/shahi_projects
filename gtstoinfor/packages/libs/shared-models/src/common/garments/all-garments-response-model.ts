import { GlobalResponseObject } from "../global-response-object";
// import { CurrencyDto } from "./currency-request";
import { GarmentsDto } from "./garments-request";


export class AllGarmentResponseModel extends GlobalResponseObject {
    data?: GarmentsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: GarmentsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

