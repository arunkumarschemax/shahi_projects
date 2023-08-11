import { GlobalResponseObject } from "../global-response-object";
import { DestinationDto } from "./destination-request";


export class AllDestinationResponseModel extends GlobalResponseObject {
    data?: DestinationDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DestinationDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

