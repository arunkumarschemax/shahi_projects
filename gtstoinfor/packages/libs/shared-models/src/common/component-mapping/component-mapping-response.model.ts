import { GlobalResponseObject } from '../global-response-object';
import { ComponentMappingModel } from './component-mapping-model';

export class ComponentMappingResponseModel extends GlobalResponseObject {
    data?: ComponentMappingModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ComponentMappingModel[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}
