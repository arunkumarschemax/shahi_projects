import { GlobalResponseObject } from '../global-response-object';
import { BuyersDto } from './buyers-dto';

export class AllBuyersModel extends GlobalResponseObject {
    data?: BuyersDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

