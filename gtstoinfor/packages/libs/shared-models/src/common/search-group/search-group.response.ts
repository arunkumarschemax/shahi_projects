
import { GlobalResponseObject } from "../global-response-object";
import { searchGroupDto } from "./search-grp.dto";

export class SearchGrpResponse extends GlobalResponseObject{
      data ?: searchGroupDto[];
    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: searchGroupDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}