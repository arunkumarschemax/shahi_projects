export class ItemInfoModel{
    id:number;
    item:string;
    poLineItemNumber:number;
    poNumber:number;
    styleNumber:string;
    totalItemQty:number;
    regionInfo:RegionModel[]

    constructor(id:number,item:string,poLineItemNumber:number,poNumber:number,styleNumber:string,totalItemQty:number,regionInfo:RegionModel[]){
        this.id = id
        this.item = item
        this.poLineItemNumber = poLineItemNumber
        this.poNumber = poNumber
        this.styleNumber = styleNumber
        this.totalItemQty = totalItemQty
        this.regionInfo = regionInfo
    }
}

export class RegionModel{
    destinationCountry:string;
    destinationCountryCode:string;
    geoCode:string;

    constructor(destinationCountry:string,destinationCountryCode:string,geoCode:string){
    this.destinationCountry = destinationCountry
    this.destinationCountryCode = destinationCountryCode
    this.geoCode = geoCode
    }
}

export class ItemInfo{
    id:number;
    item:string;
    poLineItemNumber:number;
    poNumber:number;
    totalItemQty:number;
    styleInfo:StyleInfo[]

    constructor(id:number,item:string,poLineItemNumber:number,poNumber:number,totalItemQty:number,styleInfo:StyleInfo[]){
        this.id = id
        this.item = item
        this.poLineItemNumber = poLineItemNumber
        this.poNumber = poNumber
        this.totalItemQty = totalItemQty
        this.styleInfo = styleInfo
    }
}

export class StyleInfo{
    styleNumber:string;
    regionInfo:RegionInfo[]
    constructor(styleNumber:string,regionInfo:RegionInfo[]){
        this.styleNumber = styleNumber
        this.regionInfo = regionInfo
    }
}

export class RegionInfo{
    geoCode :string;
    destinationInfo:DestinationInfo[]
    constructor(geoCode:string,destinationInfo:DestinationInfo[]){
        this.geoCode = geoCode
        this.destinationInfo = destinationInfo
    }
}

export class DestinationInfo{
    destinationCountryCode:string;
    destinationCountry: string;
    constructor(destinationCountryCode:string,destinationCountry: string){
        this.destinationCountry = destinationCountry
        this.destinationCountryCode = destinationCountryCode
    }
}