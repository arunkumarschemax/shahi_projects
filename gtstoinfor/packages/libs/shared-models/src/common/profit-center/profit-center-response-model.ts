import { GlobalResponseObject } from "../global-response-object";
import { ProfitCenterDto } from "./profit-center-dto";

export class ProfitCenterResponseModel extends GlobalResponseObject {
    data?: ProfitCenterDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ProfitCenterDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}