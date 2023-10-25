import { GlobalResponseObject } from "../global-response-object";
import { RangeDto } from "./range.dto";

export class RangeResponse extends GlobalResponseObject{
      data ?: RangeDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: RangeDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}