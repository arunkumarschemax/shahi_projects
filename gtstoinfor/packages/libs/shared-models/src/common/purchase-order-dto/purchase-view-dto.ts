import { PurchaseStatusEnum } from "../../enum";

export class PurchaseViewDto {
    id?: number;
    confirmStartDate?: string;
    confirmEndDate?: string;
    poconfirmStartDate?: string;
    poconfirmEndDate?: string;
    status?:PurchaseStatusEnum
    poFor?:string
    constructor(id?: number, confirmStartDate?: string, confirmEndDate?: string, poconfirmStartDate?: string, poconfirmEndDate?: string,status?:PurchaseStatusEnum,poFor?:string) {
        this.id = id;
        this.confirmStartDate = confirmStartDate
        this.confirmEndDate = confirmEndDate
        this.poconfirmStartDate = poconfirmStartDate
        this.poconfirmEndDate = poconfirmEndDate
        this.status = status
        this.poFor = poFor
    }

}