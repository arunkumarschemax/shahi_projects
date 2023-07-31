import { GlobalResponseObject } from '../global-response-object';
import { ComponentMappingDto } from './component-mapping-dto';

export class ComponentMappingResponseModel extends GlobalResponseObject {
    data?: ComponentMappingDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ComponentMappingDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}
