import { GlobalResponseObject } from "../global-response-object";
import { DeliveryMethodDto } from "./delivery-method-dto";

export class DeliveryMethodResponseModel extends GlobalResponseObject {
    data?: DeliveryMethodDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DeliveryMethodDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

