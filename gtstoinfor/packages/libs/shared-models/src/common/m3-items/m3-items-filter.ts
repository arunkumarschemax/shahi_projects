import { m3ItemsContentEnum } from "../../enum";


export class M3Itemsfilter {
    m3ItemsId?:number;
    itemCode?:string;
    content?: m3ItemsContentEnum;
    fabricType?:number;
    weave?: number;
    weight?:number;
    weightUnit?:string;
    construction?: string;
    yarnCount?: string;
    yarnUnit?: string;
    width?:number;
    widthUnit?:string;
    finish?: string;
    shrinkage?: string;
    buyerId?: number;
    description?:string;
    buyerCode?:string;
   
    

    constructor(m3ItemsId?:number,itemCode?:string,content?: m3ItemsContentEnum,
        fabricType?:number,weave?: number,
        weight?:number,weightUnit?:string,construction?: string,
        yarnCount?: string,yarnUnit?: string,width?:number,widthUnit?:string,finish?: string,
        shrinkage?: string,
        buyerId?: number,
        description?:string,
        buyerCode?:string,
  
        
        
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
        this.buyerCode = buyerCode;

       
       
    }
}
