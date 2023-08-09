import { GlobalResponseObject } from '../global-response-object';

import { TaxDto } from './tax-dto';


export class AllTaxesResponseModel extends GlobalResponseObject {
    data?: TaxDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: TaxDto[]){
        super(status,intlCode,internalMessage)
        this.data = data;
    }
}

