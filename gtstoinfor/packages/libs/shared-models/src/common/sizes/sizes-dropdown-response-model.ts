
import { GlobalResponseObject } from '../global-response-object';
import { SizesDropDownDto } from './size-dropdown-dto';


export class SizesDropDownResponse extends GlobalResponseObject {
    data?: SizesDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SizesDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

