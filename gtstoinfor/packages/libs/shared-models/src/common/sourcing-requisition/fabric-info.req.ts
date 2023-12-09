export class FabricInfoReq{
    m3FabricCode:number;
    color:number;
    newColor?:string;
    // content:string;
    // fabricType:string;
    // weaveId: number;
    // weight: number;
    // weightUnit : number;
    // width : number;
    // construction : string;
    // yarnCount : number;
    // yarnUnit : number;
    // finish : string;
    // shrinkage : string;
    // m3FabricCode:string;
    // color : number;
    // pch : number;
    // moq : string;
    // moqUnit : number;
    // season : string;
    // moqPrice : number;
    // moqPriceUnit : number;
    // supplier : number;
    // grnDate : Date;
    // buyer : number;
    // xlNo : string;
    quantity : number;
    quantityUnit: number;
    remarks:string;

    constructor(
        // content:string,fabricType:string,weaveId: number,weight: number,weightUnit : number,width : number,construction : string,yarnCount : number,yarnUnit : number,finish : string,shrinkage : string,m3FabricCode:string,color : number,pch : number,moq : string,moqUnit : number,season : string,moqPrice : number,moqPriceUnit : number,supplier : number,grnDate : Date,buyer : number,xlNo : string,
        m3FabricCode:number,color:number,
        quantity : number,quantityUnit: number,remarks:string,newColor?:string)
    {
        // this.content = content;
        // this.fabricType = fabricType;
        // this.weaveId = weaveId;
        // this.weight = weight;
        // this.weightUnit = weightUnit;
        // this.width = width;
        // this.construction = construction;
        // this.yarnCount = yarnCount;
        // this.yarnUnit = yarnUnit;
        // this.finish = finish;
        // this.shrinkage = shrinkage;
        // this.m3FabricCode = m3FabricCode;
        // this.color = color;
        // this.pch = pch;
        // this.moq = moq;
        // this.moqUnit = moqUnit;
        // this.season = season;
        // this.moqPrice = moqPrice;
        // this.moqPriceUnit = moqPriceUnit;
        // this.supplier = supplier;
        // this.grnDate = grnDate;
        // this.buyer = buyer;
        // this.xlNo = xlNo;
        this.quantity = quantity;
        this.quantityUnit = quantityUnit
        this.m3FabricCode = m3FabricCode;
        this.color = color;
        this.remarks = remarks
        this.newColor = newColor

    }
}