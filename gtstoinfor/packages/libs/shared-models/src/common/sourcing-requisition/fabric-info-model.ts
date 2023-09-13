export class FabricInfoModel{
    content:string;
    fabricType:string;
    weave: number;
    weight: number;
    weightUnit : string;
    width : number;
    construction : string;
    yarnCount : number;
    yarnUnit : string;
    finish : string;
    shrinkage : string;
    m3FabricCode:string;
    color : number;
    pch : number;
    moq : string;
    moqUnit : string;
    season : string;
    moqPrice : number;
    moqPriceUnit : string;
    supplier : number;
    grnDate : any;
    buyer : number;
    xlNo : string;
    quantity : number;
    weaveName:string;
    colorName:string;
    pchName:string;
    supplierName:string;
    buyerName:string;
    availableQuantity: number;
    status: string;
    quantityUnit: string

    constructor(content:string,fabricType:string,weave: number,weight: number,weightUnit : string,width : number,construction : string,yarnCount : number,yarnUnit : string,finish : string,shrinkage : string,m3FabricCode:string,color : number,pch : number,moq : string,moqUnit : string,season : string,moqPrice : number,moqPriceUnit : string,supplier : number,grnDate : any,buyer : number,xlNo : string,quantity : number,weaveName:string,colorName:string,pchName:string,supplierName:string,buyerName:string,availableQuantity: number,status: string,quantityUnit: string)
    {
        this.content = content;
        this.fabricType = fabricType;
        this.weave = weave;
        this.weight = weight;
        this.weightUnit = weightUnit;
        this.width = width;
        this.construction = construction;
        this.yarnCount = yarnCount;
        this.yarnUnit = yarnUnit;
        this.finish = finish;
        this.shrinkage = shrinkage;
        this.m3FabricCode = m3FabricCode;
        this.color = color;
        this.pch = pch;
        this.moq = moq;
        this.moqUnit = moqUnit;
        this.season = season;
        this.moqPrice = moqPrice;
        this.moqPriceUnit = moqPriceUnit;
        this.supplier = supplier;
        this.grnDate = grnDate;
        this.buyer = buyer;
        this.xlNo = xlNo;
        this.quantity = quantity;
        this.weaveName = weaveName;
        this.colorName = colorName;
        this.pchName = pchName;
        this.supplierName = supplierName;
        this.buyerName = buyerName;
        this.availableQuantity = availableQuantity;
        this.status = status;
        this.quantityUnit = quantityUnit
    }
}