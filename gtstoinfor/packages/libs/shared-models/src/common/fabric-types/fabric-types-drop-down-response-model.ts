import { GlobalResponseObject } from '../global-response-object';
import { FabricTypeDropDownDto } from './fabric-types-drop-down.dto';


export class FabricTypeDropDownResponse extends GlobalResponseObject{
    data?: FabricTypeDropDownDto[];

   /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */ 

   constructor(status: boolean, intlCode: number, internalMessage: string, data?:FabricTypeDropDownDto []){
    super(status,intlCode,internalMessage)
    this.data = data;
}
}