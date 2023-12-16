import { m3ItemsContentEnum } from "../../enum";
import { FabricContentDto } from "./fabric-content-dto";
import { FabricYarnDto } from "./fabric-yarn-dto";


export class M3ItemsDTO {
    m3ItemsId:number;
    itemCode:string;
    content: m3ItemsContentEnum;
    fabricType:number;
    weave: number;
    weight:number;
    weightUnit:string;
    construction: string;
    yarnType: string;
    // yarnUnit: string;
    width:number;
    widthUnit:string;
    finish: string;
    shrinkage: string;
    buyerId: number;
    description:string;
    buyerCode:string;
    isActive?:boolean;
    versionFlag?:number;
    extRefNumber?: string
    m3Code?:string;
    hsnCode?:string;
    fabricYarnInfo?:FabricYarnDto[]
    fabricContentInfo?:FabricContentDto[]
    constructor(
        m3ItemsId:number,
        itemCode:string,
        content: m3ItemsContentEnum,
        fabricType:number,weave: number,
        weight:number,weightUnit:string,
        construction: string,
        yarnType: string,
        width:number,
        widthUnit:string,
        finish: string,
        shrinkage: string,
        buyerId: number,
        description:string,
        buyerCode:string,
        isActive?:boolean,
        versionFlag?:number,
        extRefNumber?: string,
        m3Code?:string,
        hsnCode?:string,
        fabricYarnInfo?: FabricYarnDto[],
        fabricContentInfo?:FabricContentDto[]

        
        
    ) {
        this.m3ItemsId = m3ItemsId;
        this.itemCode = itemCode;
        this.content = content;
        this.fabricType = fabricType;
        this.weave = weave;
        this.weight = weight;
        this.buyerId = buyerId;
        this.description = description;
        this.weightUnit = weightUnit;
        this.construction = construction;
        this.yarnType = yarnType;
        this.width = width;
        this.widthUnit = widthUnit;
        this.finish = finish;
        this.shrinkage = shrinkage;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
        this.buyerCode = buyerCode;
        this.extRefNumber = extRefNumber
        this.m3Code = m3Code
        this.hsnCode=hsnCode
       this.fabricYarnInfo = fabricYarnInfo
       this.fabricContentInfo = fabricContentInfo
    }
}
