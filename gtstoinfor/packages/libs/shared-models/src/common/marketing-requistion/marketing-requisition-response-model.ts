import { GlobalResponseObject } from "../global-response-object";
import { MarketingRequisitionDto } from "./marketing-requisition-dto";

export class MarketingRequisitionResponseModel extends GlobalResponseObject {
    data?: MarketingRequisitionDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: MarketingRequisitionDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

