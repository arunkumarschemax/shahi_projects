import { FabricInfoReq } from "./fabric-info.req";

export class SourcingRequisitionReq{
    style : string;
    fabricInfo: FabricInfoReq[];
    trimInfo: any[];

    constructor(style:string,fabricInfo:FabricInfoReq[],trimInfo:any[]){
        this.style = style;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo
    }
}