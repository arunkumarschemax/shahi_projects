import { FabricInfoReq } from "./fabric-info.req";
import { TrimInfoReq } from "./trim-req";

export class SourcingRequisitionReq{
    style : string;
    expectedDate: Date;
    fabricInfo: FabricInfoReq[];
    trimInfo: TrimInfoReq[];

    constructor(style:string,expectedDate: Date,fabricInfo:FabricInfoReq[],trimInfo:TrimInfoReq[]){
        this.style = style;
        this.expectedDate = expectedDate;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo
    }
}