import { SampleDevelopmentStatusEnum } from "../../enum";

export class SampleFilterRequest{
    reqNo?:string;
    pch?: string
    style?: string
    status?: SampleDevelopmentStatusEnum
    
    constructor(reqNo?:string,pch?: string, style?: string, status?: SampleDevelopmentStatusEnum){
        this.reqNo = reqNo;
        this.pch = pch
        this.style = style
        this.status = status
    }
}
