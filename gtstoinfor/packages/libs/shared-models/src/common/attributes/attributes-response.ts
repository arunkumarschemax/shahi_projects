import { GlobalResponseObject } from "../global-response-object";
import { AttributesDto } from "./attribute.dto";

export class AttributeResponse extends GlobalResponseObject{
      data?: AttributesDto;
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: AttributesDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}