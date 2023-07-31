import { GlobalResponseObject } from '../global-response-object';
import { DeliveryTermsDropDownDto } from './delivery-terms-drop-down.dto';


export class DeliveryTermsDropDownResponseModel extends GlobalResponseObject {
    data?: DeliveryTermsDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DeliveryTermsDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

