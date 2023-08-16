import { GlobalResponseObject } from '../global-response-object';
import { FabricTypesDto } from './fabric-types.dto';

export class AllFabricTypesResponse extends GlobalResponseObject{
    data?: FabricTypesDto [];
 /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */

 constructor(status:boolean, intlCode:number, internalMessage:string, data?: FabricTypesDto[]){
    super(status,intlCode,internalMessage);
    this.status = status;
    this.internalMessage = internalMessage;
    this.data = data;
}
}