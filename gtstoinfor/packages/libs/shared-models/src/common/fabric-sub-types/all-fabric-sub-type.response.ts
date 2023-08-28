import { FabricSubTypeDto } from '@project-management-system/shared-models';
import { GlobalResponseObject } from '../global-response-object';

export class AllFabricSubTypeResponse extends GlobalResponseObject{
    data?: FabricSubTypeDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
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