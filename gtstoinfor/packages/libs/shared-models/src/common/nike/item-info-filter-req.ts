export class ItemInfoFilterReq{
    fromDate ?: any;
    toDate ?: any;
    item?: string;
    region?: string;

    constructor(fromDate?:any,toDate?:any,item?: string,region?:string){
        this.fromDate = fromDate
        this.toDate = toDate
        this.item = item
        this.region = region

    }
}