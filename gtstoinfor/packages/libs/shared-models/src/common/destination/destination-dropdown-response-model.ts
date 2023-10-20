
import { GlobalResponseObject } from '../global-response-object';
import { DestinationDropDownDto } from './destination-dropdown-dto';

export class DestinationDropDownResponse extends GlobalResponseObject {
    data?: DestinationDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DestinationDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}