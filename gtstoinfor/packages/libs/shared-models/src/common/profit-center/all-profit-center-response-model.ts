import { ProfitCenterDto } from "./profit-center-dto";
import { GlobalResponseObject } from "../global-response-object";


export class AllProfitCenterResponseModel extends GlobalResponseObject{
    data?: ProfitCenterDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ProfitCenterDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}

