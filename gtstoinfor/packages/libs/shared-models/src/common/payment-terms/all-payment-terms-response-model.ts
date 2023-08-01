import { GlobalResponseObject } from '../global-response-object';
import { PaymentTermsDto } from './payment-terms-dto';



export class AllPaymentTermsResponseModel extends GlobalResponseObject {
    data?: PaymentTermsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PaymentTermsDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.errorCode = this.errorCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

