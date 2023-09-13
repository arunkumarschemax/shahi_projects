import { GlobalResponseObject } from '../global-response-object';
import { M3MastersModel } from './m3-masters-model';


export class M3MastersResponseModel extends GlobalResponseObject {
    data?: M3MastersModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: M3MastersModel[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

