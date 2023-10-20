import { GlobalResponseObject } from '../global-response-object';
import { ProcurmentGroupDto } from './procurment-group-model';


export class ProcurmentGroupModel extends GlobalResponseObject{
    data?: ProcurmentGroupDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //PaymentTermsDto
     */
     constructor(status: boolean, errorCode: number, internalMessage: string, data?: ProcurmentGroupDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}
