
import { GlobalResponseObject } from '../global-response-object';
import { ColourDropDownDto } from './colour-dropdown-dto';

export class ColourDropDownResponse extends GlobalResponseObject {
    data?: ColourDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ColourDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

