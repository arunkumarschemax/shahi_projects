export class m3FabricFiltersReq{
    buyerId?:number;
    fabricTypeId?: number;
    weaveId?: number;
    weightValue?: number;
    weightUnit?: number;
    epiConstruction?: any;
    ppiConstruction: any;
    yarnType?: any;
    widthValue?: any;
    widthUnit?: any;
    finishId?: number;
    shrinkage?: string;
    hsnCode?: string;
    content?:number
    m3Code?:string
    fabricType?:string

    constructor(
        buyerId?:number,
        fabricTypeId?: number,
        weaveId?: number,
        weightUnit?: number,
        epiConstruction?: any,
        ppiConstruction?: any,
        yarnType?: any,
        widthUnit?: any,
        finishId?: number,
        shrinkage?: string,
        hsnCode?: string,
        content?:number,
        weightValue?: number,
        widthValue?: any,
        m3Code?:string,
        fabricType?:string

    ){
        this.buyerId=buyerId
        this.fabricTypeId=fabricTypeId
        this.weaveId=weaveId
        this.weightValue=weightValue
        this.weightUnit=weightUnit
        this.epiConstruction=epiConstruction
        this.ppiConstruction=ppiConstruction
        this.yarnType=yarnType
        this.widthValue=widthValue
        this.widthUnit=widthUnit
        this.finishId=finishId
        this.shrinkage=shrinkage
        this.hsnCode=hsnCode
        this.content=content
        this.m3Code=m3Code
        this.fabricType = fabricType
    }
}