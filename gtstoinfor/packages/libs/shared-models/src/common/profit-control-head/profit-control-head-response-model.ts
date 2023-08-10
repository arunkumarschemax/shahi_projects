import { GlobalResponseObject } from "../global-response-object";
import {ProfitControlHeadDto} from "./profit-control-head-dto"


export class ProfitControlHeadResponseModel extends GlobalResponseObject {
    data?: ProfitControlHeadDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ProfitControlHeadDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}