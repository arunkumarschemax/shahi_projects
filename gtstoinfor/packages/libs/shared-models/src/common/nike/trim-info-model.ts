export class TrimInfoModel{
    styleId:number;
    style:string;
    styleName:string;
    bomInfo:BomInfo[]

    constructor(styleId:number,style:string,styleName:string,bomInfo:BomInfo[]){
        this.styleId = styleId
        this.style = style
        this.styleName = styleName
        this.bomInfo = bomInfo
    }
}

export class BomInfo{
    bomId:number;
    itemName:string;
    description:string;
    imCOde:string;
    itemType:string;
    use:string;
    styleComboInfo:StyleComboInfo[]
    constructor(bomId:number,itemName:string,description:string,imCOde:string,itemType:string,use:string,styleComboInfo:StyleComboInfo[]){
    this.bomId = bomId
    this.itemName = itemName
    this.description = description
    this.imCOde = imCOde
    this.itemType = itemType
    this.use = use
    this.styleComboInfo = styleComboInfo
    }
}

export class StyleComboInfo{
    styleComboId: number;
    combination:string;
    primaryColor: string;
    secondaryColor:string;
    logoColor:string;

    constructor(styleComboId: number,combination:string,primaryColor: string,secondaryColor:string,logoColor:string){
        this.styleComboId = styleComboId  
        this.combination = combination 
        this.primaryColor  = primaryColor  
        this.secondaryColor = secondaryColor 
        this.logoColor = logoColor
    }

}
