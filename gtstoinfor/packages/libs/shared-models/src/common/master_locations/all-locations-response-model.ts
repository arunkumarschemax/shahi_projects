import { GlobalResponseObject } from "../global-response-object";
import { MasterLocationsDto } from "./master-locations-request";


export class AllLocationsResponseModel extends GlobalResponseObject {
    data?: MasterLocationsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: MasterLocationsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

