import { GlobalResponseObject } from '../global-response-object';
import { CountriesDropDownData } from './countries-drop-down-model';

export class CountriesDropDownDataResponseModel extends GlobalResponseObject{
    data?: CountriesDropDownData[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data //CountriesDropDownData[]
     */
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: CountriesDropDownData[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}