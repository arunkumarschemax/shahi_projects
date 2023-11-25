
import { GlobalResponseObject } from '../global-response-object';
import { RackPositionDropDownDto } from './rack-position-dropdown.dto';


export class RackPositionDropDownResponse extends GlobalResponseObject {
    data?: RackPositionDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: RackPositionDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

