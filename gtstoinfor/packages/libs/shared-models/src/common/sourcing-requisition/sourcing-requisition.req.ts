import { FabricInfoReq } from "./fabric-info.req";
import { TrimInfoReq } from "./trim-req";

export class SourcingRequisitionReq{
    style : number;
    expectedDate: Date;
    requestNo: string;
    indentDate:Date;
    indentFabricDetails: FabricInfoReq[];
    indentTrimDetails: TrimInfoReq[];
    buyerId: number;

    constructor(style:number,expectedDate: Date,requestNo: string,indentDate:Date,indentFabricDetails:FabricInfoReq[],indentTrimDetails:TrimInfoReq[],buyerId: number){
        this.style = style;
        this.expectedDate = expectedDate;
        this.requestNo = requestNo;
        this.indentDate = indentDate;
        this.indentFabricDetails = indentFabricDetails;
        this.indentTrimDetails = indentTrimDetails
        this.buyerId = buyerId
    }
}

export class indentIdReq{
    indentId:number[]
}