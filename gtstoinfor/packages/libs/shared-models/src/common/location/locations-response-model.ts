import { GlobalResponseObject } from "../global-response-object";
import { LocationDto } from "./locations-dto";

export class LocationResponseModel extends GlobalResponseObject{
    data?: LocationDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DeliveryTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: LocationDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
