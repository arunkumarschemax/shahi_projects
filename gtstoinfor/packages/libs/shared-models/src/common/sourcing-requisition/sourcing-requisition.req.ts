import { FabricInfoReq } from "./fabric-info.req";
import { TrimInfoReq } from "./trim-req";

export class SourcingRequisitionReq{
    style : string;
    fabricInfo: FabricInfoReq[];
    trimInfo: TrimInfoReq[];

    constructor(style:string,fabricInfo:FabricInfoReq[],trimInfo:TrimInfoReq[]){
        this.style = style;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo
    }
}