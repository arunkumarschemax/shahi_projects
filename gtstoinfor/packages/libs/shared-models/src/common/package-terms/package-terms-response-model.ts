import { GlobalResponseObject } from '../global-response-object';
import { PackageTermsDto } from './package-terms-dto';

export class PackageTermsResponseModel extends GlobalResponseObject{
    data?: PackageTermsDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data 
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: PackageTermsDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
