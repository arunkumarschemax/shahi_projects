import { GlobalResponseObject } from "../global-response-object";
import { AddressModel } from "./address.model";


export class AddressResponseModel extends GlobalResponseObject {
    data? : AddressModel[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: AddressModel[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}