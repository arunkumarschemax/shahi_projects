import { GlobalResponseObject } from "../global-response-object";
import { PaymentMethodDto } from "./payment-method-dto";
export class PaymentMethodResponseModel extends GlobalResponseObject {
    data?: PaymentMethodDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PaymentMethodDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
