import { GlobalResponseObject } from '../global-response-object';
import { VendorDropDownDto } from './vendors-drop-down.dto';


export class VendorsDropDownResponseModel extends GlobalResponseObject {
    data?: VendorDropDownDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: VendorDropDownDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

