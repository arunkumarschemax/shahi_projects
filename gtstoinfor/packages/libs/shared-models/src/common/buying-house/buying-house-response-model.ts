import { GlobalResponseObject } from "../global-response-object";
import { BuyingHouseDto } from "./buying-house-dto";

export class BuyingHouseResponseModel extends GlobalResponseObject {
    data?: BuyingHouseDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyingHouseDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

