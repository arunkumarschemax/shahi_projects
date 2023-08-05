import { GlobalResponseObject } from '../global-response-object';
import { AttributesDto } from './attribute.dto';


export class AllAttributesResponse extends GlobalResponseObject{
    data?: AttributesDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: AttributesDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

