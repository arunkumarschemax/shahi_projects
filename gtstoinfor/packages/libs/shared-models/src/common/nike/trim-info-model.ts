export class TrimInfoModel{
    styleId:number;
    style:string;
    styleName:string;
    season:string;
    bomInfo:BomInfo[];
    item:string;
    poNumber:string;
    msc?:string
    gender?:string

    constructor(styleId:number,style:string,styleName:string,season:string,bomInfo:BomInfo[],item:string,poNumber:string,msc?:string,gender?:string){
        this.styleId = styleId
        this.style = style
        this.styleName = styleName
        this.season=season
        this.bomInfo = bomInfo
        this.item = item
        this.poNumber = poNumber
        this.msc=msc
        this.gender=gender
    }
}

export class BomInfo{
    bomId:number;
    itemName:string;
    description:string;
    imCode:string;
    itemType:string;
    use:string;
    uom: string;
    qty:number;
    styleComboInfo:StyleComboInfo[]
    constructor(bomId:number,itemName:string,description:string,imCode:string,itemType:string,use:string,uom:string,qty:number,styleComboInfo:StyleComboInfo[]){
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

export class StyleComboInfo{
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
