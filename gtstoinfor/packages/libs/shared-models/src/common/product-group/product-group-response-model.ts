import { GlobalResponseObject } from '../global-response-object';
import { ProductGroupDto } from './product-group-model';


export class ProductGroupModel extends GlobalResponseObject{
    data?: ProductGroupDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //PaymentTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: ProductGroupDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
