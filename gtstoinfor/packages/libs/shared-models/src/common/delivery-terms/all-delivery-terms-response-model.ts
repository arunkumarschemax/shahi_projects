import { GlobalResponseObject } from '../global-response-object';
import { DeliveryTermsDto } from './delivery-terms-dto';


export class AllDeliveryTermsResponseModel extends GlobalResponseObject {
    data?: DeliveryTermsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DeliveryTermsDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

