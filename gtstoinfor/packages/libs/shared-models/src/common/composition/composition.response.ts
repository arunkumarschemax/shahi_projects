import { GlobalResponseObject } from "../global-response-object";
import { CompositionDto } from "./composition.dto";

export class CompositionResponse extends GlobalResponseObject{
      data ?: CompositionDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: CompositionDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}