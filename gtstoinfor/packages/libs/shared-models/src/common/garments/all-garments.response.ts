import { GlobalResponseObject } from '../global-response-object';
import { GarmentsDto } from './garments.dto';


export class AllGarmentsResponse extends GlobalResponseObject{
    data?: GarmentsDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: GarmentsDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

