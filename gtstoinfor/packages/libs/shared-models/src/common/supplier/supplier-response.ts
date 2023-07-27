import { SupplierCreateDto } from "./supplier-create-dto";
import { SupplierResponseObject } from "./supplier-response-objects";




export class SupplierResponse extends SupplierResponseObject {
    data?:  SupplierCreateDto;

    /**
     * 
     * @param status
     * @param errorCode
     * @param internalMessage
     * @param data
     */
    constructor (status : boolean, errorCode: number, internalMessage: string, data?:  SupplierCreateDto){
        super (status, errorCode, internalMessage);
        this.data = data;
    }
}