import { FabricTypesDto } from "./fabric-types.dto";
import { GlobalResponseObject } from "../global-response-object";

export class FabricTypeResponse extends GlobalResponseObject{
    data?: FabricTypesDto[];

 /**
   * 
   * @param status 
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
