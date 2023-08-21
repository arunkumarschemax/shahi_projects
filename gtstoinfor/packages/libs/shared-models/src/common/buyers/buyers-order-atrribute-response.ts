import { GlobalResponseObject } from '../global-response-object';
import { BuyersOrderAttributeModel } from './buyers-order-attribute-model';

export class BuyersOrderAttributeResponseModel extends GlobalResponseObject{
    data?: BuyersOrderAttributeModel[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //BuyersDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersOrderAttributeModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
