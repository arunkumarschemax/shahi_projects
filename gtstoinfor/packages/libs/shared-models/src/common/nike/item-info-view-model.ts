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