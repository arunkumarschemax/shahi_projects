import { GlobalResponseObject } from '../global-response-object';
import {AccountControlObjectDto} from '@project-management-system/shared-models'
export class AllAccountControlObjectResponse extends GlobalResponseObject{
    data?: AccountControlObjectDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: AccountControlObjectDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}