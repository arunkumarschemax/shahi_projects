import { ProfitControlHeadDto } from "./profit-control-head-dto";
import { GlobalResponseObject } from "../global-response-object";


export class AllProfitControlHeadResponseModel extends GlobalResponseObject{
    data?: ProfitControlHeadDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ProfitControlHeadDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}

