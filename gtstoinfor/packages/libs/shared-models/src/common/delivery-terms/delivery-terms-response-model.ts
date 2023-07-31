import { GlobalResponseObject } from "../global-response-object";
import { DeliveryTermsDto } from "./delivery-terms-dto";

export class DeliveryTermsResponseModel extends GlobalResponseObject{
    data?: DeliveryTermsDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DeliveryTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: DeliveryTermsDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
