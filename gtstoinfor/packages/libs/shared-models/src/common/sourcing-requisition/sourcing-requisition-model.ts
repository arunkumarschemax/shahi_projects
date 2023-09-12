import { FabricInfoReq } from "./fabric-info.req";
import { TrimInfoReq } from "./trim-req";

export class SourcingRequisitionModel{
    sourcingRequisitionId: number;
    style : string;
    fabricInfo: FabricInfoReq[];
    trimInfo: TrimInfoReq[];
    versionFlag: number;

    constructor(sourcingRequisitionId: number,style:string,fabricInfo:FabricInfoReq[],trimInfo:TrimInfoReq[],versionFlag:number){
        this.sourcingRequisitionId = sourcingRequisitionId;
        this.style = style;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo;
        this.versionFlag = versionFlag;
    }
}