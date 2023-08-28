import { GlobalResponseObject } from "../common";


export class DocumentFileUploadResponse extends GlobalResponseObject{
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
        this.data = data;
    }
}

