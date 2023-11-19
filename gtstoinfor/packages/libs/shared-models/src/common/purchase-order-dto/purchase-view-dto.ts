import { StatusEnum } from "../../enum";

export class PurchaseViewDto {
    id?: number;
    confirmStartDate?: string;
    confirmEndDate?: string;
    poconfirmStartDate?: string;
    poconfirmEndDate?: string;
    status?:StatusEnum
    constructor(id?: number, confirmStartDate?: string, confirmEndDate?: string, poconfirmStartDate?: string, poconfirmEndDate?: string,status?:StatusEnum) {
        this.id = id;
        this.confirmStartDate = confirmStartDate
        this.confirmEndDate = confirmEndDate
        this.poconfirmStartDate = poconfirmStartDate
        this.poconfirmEndDate = poconfirmEndDate
        this.status = status
    }

}