import { GlobalResponseObject } from "../global-response-object";
import { MasterLocationsDto } from "./master-locations-request";
export class MasterLocationsResponseModel extends GlobalResponseObject{
    data?: MasterLocationsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //MasterLocationsDto
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: MasterLocationsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}
