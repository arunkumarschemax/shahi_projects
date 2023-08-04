import { GlobalResponseObject } from '../global-response-object';
import { BuyersOrderAttributeDto } from './buyers-order-attribute-dto';

export class BuyersOrderAttributeResponseModel extends GlobalResponseObject{
    data?: BuyersOrderAttributeDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //BuyersDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersOrderAttributeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
