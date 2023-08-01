import { GlobalResponseObject } from '../global-response-object';
import { PaymentTermsDropDownDto } from './payment-terms-drop-down-dto';

export class PaymentTermsDropDownResponseModel extends GlobalResponseObject {
    data?: PaymentTermsDropDownDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PaymentTermsDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.errorCode = this.errorCode
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

