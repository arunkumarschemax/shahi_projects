
import { GlobalResponseObject } from "../global-response-object";
import { GroupTechClassDto } from "./group-tech-class.dto";
import { GroupTechClassRequest } from "./group-tech-class.request";

export class AllGroupTechClassResponse extends GlobalResponseObject{
      data?: GroupTechClassDto[];
    /**
     * 
     * @param status 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, intlCode:number, internalMessage:string, data?: GroupTechClassDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }

}