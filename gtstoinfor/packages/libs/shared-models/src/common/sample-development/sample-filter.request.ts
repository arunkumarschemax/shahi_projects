import { SampleDevelopmentStatusEnum } from "../../enum";

export class SampleFilterRequest{
    reqNo?:string;
    pch?: string
    styleNo?: string
    status?: SampleDevelopmentStatusEnum
    sampleId?: number
    buyerId?:number
    constructor( reqNo?:string,pch?: string, styleNo?: string, status?: SampleDevelopmentStatusEnum, sampleId?: number,buyerId?:number){
        this.reqNo = reqNo;
        this.pch = pch
        this.styleNo = styleNo
        this.status = status
        this.sampleId = sampleId
        this.buyerId = buyerId
    }
}
