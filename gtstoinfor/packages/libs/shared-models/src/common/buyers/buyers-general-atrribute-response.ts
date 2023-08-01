import { GlobalResponseObject } from '../global-response-object';
import { BuyersGeneralAttributeDto } from './buyers-general-attribute-dto';

export class BuyersGeneralAttributeResponseModel extends GlobalResponseObject{
    data?: BuyersGeneralAttributeDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //BuyersDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersGeneralAttributeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
