export class BomPrintInfoModel{
    item: string;
    geoCode:string;
    destinationCountry: string;
    shipToAddress: string
    style: string;
    styleName:string;
    season: string;
    poNumber: string;
    msc:string;
    gender:string;
    plant:string;
    styleType:string;
    bomInfo: any[];
    sizeInfo:any[]

    constructor(item: string,geoCode:string,destinationCountry: string,shipToAddress: string,style: string,styleName:string,season: string,poNumber: string,msc:string,gender:string,plant:string,styleType:string,bomInfo: any[],sizeInfo:any[]){
        this.item = item
        this.geoCode = geoCode
        this.destinationCountry = destinationCountry
        this.shipToAddress = shipToAddress
        this.style = style
        this.styleName = styleName
        this.season = season
        this.poNumber = poNumber
        this.msc = msc
        this.gender = gender
        this.plant = plant
        this.styleType = styleType
        this.bomInfo = bomInfo
        this.sizeInfo = sizeInfo
    }

}

export class BomInfoModel{
    bomId:number;
    itemName:string;
    description:string;
    imCode:string;
    itemType:string;
    use:string;
    uom: string;
    qty:number;
    styleComboInfo:StyleComboInfoModel[]
    constructor(bomId:number,itemName:string,description:string,imCode:string,itemType:string,use:string,uom:string,qty:number,styleComboInfo:StyleComboInfoModel[]){
    this.bomId = bomId
    this.itemName = itemName
    this.description = description
    this.imCode = imCode
    this.itemType = itemType
    this.use = use
    this.uom = uom
    this.qty = qty
    this.styleComboInfo = styleComboInfo
    }
}

export class StyleComboInfoModel{
    styleComboId: number;
    combination:string;
    primaryColor: string;
    secondaryColor:string;
    logoColor:string;
    color:string;

    constructor(styleComboId: number,combination:string,primaryColor: string,secondaryColor:string,logoColor:string,color:string){
        this.styleComboId = styleComboId  
        this.combination = combination 
        this.primaryColor  = primaryColor  
        this.secondaryColor = secondaryColor 
        this.logoColor = logoColor
        this.color = color
    }

}

export class SizeInfo{
    size : string;
    quantity: number;

    constructor(size:string,quantity:number){
        this.size = size
        this.quantity = quantity

    }
}