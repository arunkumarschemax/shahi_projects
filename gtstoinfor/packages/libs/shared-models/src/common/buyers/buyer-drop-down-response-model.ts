import { GlobalResponseObject } from '../global-response-object';
import { BuyersDropDownData } from './buyers-drop-down-model';

export class BuyersDropDownDataResponseModel extends GlobalResponseObject{
    data?: BuyersDropDownData[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //BuyersDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: BuyersDropDownData[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
