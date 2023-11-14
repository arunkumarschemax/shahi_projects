import { FabricInfoReq } from "./fabric-info.req";
import { TrimInfoReq } from "./trim-req";

export class SourcingRequisitionReq{
    style : string;
    expectedDate: Date;
    requestNo: string;
    indentDate:Date;
    indentFabricDetails: FabricInfoReq[];
    indentTrimDetails: TrimInfoReq[];

    constructor(style:string,expectedDate: Date,requestNo: string,indentDate:Date,indentFabricDetails:FabricInfoReq[],indentTrimDetails:TrimInfoReq[]){
        this.style = style;
        this.expectedDate = expectedDate;
        this.requestNo = requestNo;
        this.indentDate = indentDate;
        this.indentFabricDetails = indentFabricDetails;
        this.indentTrimDetails = indentTrimDetails
    }
}

export class indentIdReq{
    indentId:number[]
}