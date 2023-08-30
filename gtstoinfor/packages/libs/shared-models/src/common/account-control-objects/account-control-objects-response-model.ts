import { GlobalResponseObject } from '../global-response-object';
import { AccountControlObjectDropDownDto } from './account-control-object-drop-down-dto';
import { AccountControlObjectDto } from './account-control-objects-dto';

export class AccountControlObjectResponseModel extends GlobalResponseObject {
    data?: AccountControlObjectDropDownDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?:AccountControlObjectDropDownDto []){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}