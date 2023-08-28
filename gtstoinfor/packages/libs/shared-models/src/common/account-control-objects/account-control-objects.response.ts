import { AccountControlObjectDto } from "./account-control-objects-dto";
import { GlobalResponseObject } from "../global-response-object";

export class AccountControlObjectResponse extends GlobalResponseObject{
    data?:AccountControlObjectDto [];

    /**
   * 
   * @param status 
    * @param errorCode 
   * @param internalMessage 
   * @param data 
   */

    constructor(status:boolean, intlCode:number, internalMessage:string, data?: AccountControlObjectDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}