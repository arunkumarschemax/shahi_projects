import { GlobalResponseObject } from '../global-response-object';
import { PackageTermsDropDownDto } from './package-terms-drop-down-dto';

export class PackageTermsDropDownResponseModel extends GlobalResponseObject {
    data?: PackageTermsDropDownDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PackageTermsDropDownDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.errorCode = this.errorCode
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

