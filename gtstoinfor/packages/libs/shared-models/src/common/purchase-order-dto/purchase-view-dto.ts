import { PurchaseStatusEnum } from "../../enum";
import { ExternalRefReq } from "../buyers";

export class PurchaseViewDto {
    ExternalRefNo?:string
    id?: number;
    confirmStartDate?: string;
    confirmEndDate?: string;
    poconfirmStartDate?: string;
    poconfirmEndDate?: string;
    status?:PurchaseStatusEnum
    poFor?:string
    constructor(ExternalRefNo?:string,id?: number, confirmStartDate?: string, confirmEndDate?: string, poconfirmStartDate?: string, poconfirmEndDate?: string,status?:PurchaseStatusEnum,poFor?:string) {
        this.ExternalRefNo = ExternalRefNo
        this.id = id;
        this.confirmStartDate = confirmStartDate
        this.confirmEndDate = confirmEndDate
        this.poconfirmStartDate = poconfirmStartDate
        this.poconfirmEndDate = poconfirmEndDate
        this.status = status
        this.poFor = poFor
    }

}