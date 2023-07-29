import { GlobalResponseObject } from "@project-management-system/shared-models";


export class BrandUploadResponse extends GlobalResponseObject{
    data?: string;

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status:boolean, intlCode:number, internalMessage:string, data?: string){
        super(status,intlCode,internalMessage);
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

