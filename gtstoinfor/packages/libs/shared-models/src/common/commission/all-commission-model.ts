import { GlobalResponseObject } from "../global-response-object";
import { CommissionDto } from "./commission-dto";




export class AllCommissionResponseModel extends GlobalResponseObject {
    data?: CommissionDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CommissionDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

