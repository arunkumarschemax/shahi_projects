import { GlobalResponseObject } from '../global-response-object';
import { AccountControlObjectDto } from './account-control-objects-dto';

export class AccountControlObjectDetailsResponse extends GlobalResponseObject{
    data?: AccountControlObjectDto;

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: AccountControlObjectDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}