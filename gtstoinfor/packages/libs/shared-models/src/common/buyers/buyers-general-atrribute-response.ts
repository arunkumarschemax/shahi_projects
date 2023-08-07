import { GlobalResponseObject } from '../global-response-object';
import { BuyersGeneralAttributeModel } from './buyers-general-attribute-model';

export class BuyersGeneralAttributeResponseModel extends GlobalResponseObject{
    data?: BuyersGeneralAttributeModel[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //BuyersDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersGeneralAttributeModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
