import { GlobalResponseObject } from '../global-response-object';
import { PackageTermsDto } from './package-terms-dto';



export class AllPackageTermsResponseModel extends GlobalResponseObject {
    data?: PackageTermsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: PackageTermsDto[]){
        super(status,intlCode,internalMessage)
        this.status = status;
        this.errorCode = this.errorCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

