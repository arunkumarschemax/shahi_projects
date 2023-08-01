import { GlobalResponseObject } from '../global-response-object';
import { LocationDto } from './locations-dto';


export class AllLocationResponseModel extends GlobalResponseObject {
    data?: LocationDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: LocationDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

