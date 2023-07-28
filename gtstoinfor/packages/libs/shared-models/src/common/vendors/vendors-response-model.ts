import { GlobalResponseObject } from "../global-response-object";
import { VendorsDto } from "./vendors.dto";


export class VendorsResponseModel extends GlobalResponseObject{
    data?: VendorsDto;
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: VendorsDto) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}
