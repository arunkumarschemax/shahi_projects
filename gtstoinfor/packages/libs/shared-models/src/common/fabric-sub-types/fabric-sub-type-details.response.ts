import { GlobalResponseObject } from '../global-response-object';
import { FabricSubTypeDropDownDto } from './fabric-sub-type-drop-down-dto';

export class FabricSubTypeDetailsResponse extends GlobalResponseObject{
    data?: FabricSubTypeDropDownDto;

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: FabricSubTypeDropDownDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}