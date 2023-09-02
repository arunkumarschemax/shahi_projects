import { GlobalResponseObject } from "../../common";
import { UomInfoModel } from "./uom-info.model";

export class UomResponse extends GlobalResponseObject {
    data: UomInfoModel[];

    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status:boolean, errorCode:number, internalMessage:string, data:  UomInfoModel[]){
        super(status,errorCode,internalMessage);
        this.data = data;
    } 
}