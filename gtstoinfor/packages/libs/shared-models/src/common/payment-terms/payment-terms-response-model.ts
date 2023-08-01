import { GlobalResponseObject } from '../global-response-object';
import { PaymentTermsDto } from './payment-terms-dto';

export class PaymentTermsResponseModel extends GlobalResponseObject{
    data?: PaymentTermsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //PaymentTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: PaymentTermsDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
