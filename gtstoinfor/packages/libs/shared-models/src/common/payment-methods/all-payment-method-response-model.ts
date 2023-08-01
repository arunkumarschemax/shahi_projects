import { PaymentMethodDto } from './payment-method-dto';
import { GlobalResponseObject } from "../global-response-object";


export class AllPaymentMethodResponseModel extends GlobalResponseObject {
    data?: PaymentMethodDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PaymentMethodDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}