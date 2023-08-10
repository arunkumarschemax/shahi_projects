import { GlobalResponseObject } from "../global-response-object";
import { SupplierCreateDto } from "./supplier-create-dto";

export class SupplierResponse extends  GlobalResponseObject {
    data?:  SupplierCreateDto;
    status: boolean;
    errorCode: number;
    internalMessage: string;

    /**
     * 
     * @param status
     * @param errorCode
     * @param internalMessage
     * @param data
     */


   constructor(status: boolean, errorCode: number, internalMessage: string, data?: SupplierCreateDto){
        super(status, errorCode, internalMessage);
        this.data = data;
     }
}