import { FabricInfoModel } from "./fabric-info-model";
import { TrimInfoModel } from "./trim-info-model";

export class SourcingRequisitionModel{
    sourcingRequisitionId: number;
    styleId:number;
    style : string;
    styleDescription: string;
    requestNo:string;
    expectedDate:any;
    fabricInfo: FabricInfoModel[];
    trimInfo: TrimInfoModel[];
    versionFlag: number;

    constructor(sourcingRequisitionId: number,styleId:number,style:string,styleDescription: string,requestNo:string,expectedDate:any,fabricInfo:FabricInfoModel[],trimInfo:TrimInfoModel[],versionFlag:number){
        this.sourcingRequisitionId = sourcingRequisitionId;
        this.styleId = styleId
        this.style = style;
        this.styleDescription = styleDescription;
        this.requestNo = requestNo;
        this.expectedDate = expectedDate;
        this.fabricInfo = fabricInfo;
        this.trimInfo = trimInfo;
        this.versionFlag = versionFlag;
    }
}