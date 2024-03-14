export class ItemInfoFilterReq{
    fromDate ?: any;
    toDate ?: any;
    item?: string;
    region?: string;
    productCode?:string;
    planningSeasonYear?:string;
    planningSeasonCode?:string;
    styleNo?:string[];

    constructor(fromDate?:any,toDate?:any,item?: string,region?:string,productCode?:string,planningSeasonYear?:string,planningSeasonCode?:string,styleNo?:string[]
        ){
        this.fromDate = fromDate
        this.toDate = toDate
        this.item = item
        this.region = region
        this.productCode = productCode
        this.planningSeasonYear  = planningSeasonYear
        this.planningSeasonCode = planningSeasonCode
        this.styleNo = styleNo
    }
}