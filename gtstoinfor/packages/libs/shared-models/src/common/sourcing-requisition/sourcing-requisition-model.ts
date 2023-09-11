import { FabricInfoReq } from "./fabric-info.req";

export class SourcingRequisitionModel{
    sourcingRequisitionId: number;
    style : string;
    fabricInfo: FabricInfoReq[];
    trimInfo: any[];
    versionFlag: number;

    constructor(sourcingRequisitionId: number,style:string,fabricInfo:FabricInfoReq[],trimInfo:any[],versionFlag:number){
        this.sourcingRequisitionId = sourcingRequisitionId;
        this.style = style;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo;
        this.versionFlag = versionFlag;
    }
}