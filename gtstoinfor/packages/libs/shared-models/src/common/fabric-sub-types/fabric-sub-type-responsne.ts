import { FabricSubTypeDto } from "./fabric-sub-type.dto";
import { GlobalResponseObject } from "../global-response-object";

export class FabricSubTypeResponse extends GlobalResponseObject{
    data?:FabricSubTypeDto [];

    /**
   * 
   * @param status 
   * @param internalMessage 
   * @param data 
   */

    constructor(status:boolean, intlCode:number, internalMessage:string, data?: FabricSubTypeDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}