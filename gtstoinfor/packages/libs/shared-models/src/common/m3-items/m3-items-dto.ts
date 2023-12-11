import { m3ItemsContentEnum } from "../../enum";


export class M3ItemsDTO {
    m3ItemsId:number;
    itemCode:string;
    content: m3ItemsContentEnum;
    fabricType:number;
    weave: number;
    weight:number;
    weightUnit:string;
    construction: string;
    yarnCount: string;
    yarnUnit: string;
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

    constructor(m3ItemsId:number,itemCode:string,content: m3ItemsContentEnum,
        fabricType:number,weave: number,
        weight:number,weightUnit:string,construction: string,
        yarnCount: string,yarnUnit: string,width:number,widthUnit:string,finish: string,
        shrinkage: string,
        buyerId: number,
        description:string,
        buyerCode:string,
        m3Code?:string,
        isActive?:boolean,
        versionFlag?:number,
        extRefNumber?: string,
        
        
        
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
        this.yarnCount = yarnCount;
        this.yarnUnit = yarnUnit;
        this.finish = finish;
        this.shrinkage = shrinkage;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
        this.buyerCode = buyerCode;
        this.extRefNumber = extRefNumber
        this.m3Code = m3Code
       
    }
}
