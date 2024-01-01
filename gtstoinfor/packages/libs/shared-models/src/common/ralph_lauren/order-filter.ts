
export class PoOrderFilter {
    poNumber?: string;
    externalRefNo?:string
    poDateStartDate?:any
    poDateEndDate?:any
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any
    season?:string
    

    constructor(poNumber?: string, externalRefNo?:string ,poDateStartDate?:any,
        poDateEndDate?:any, deliveryDateStartDate?:any,
        deliveryDateEndDate?:any, season?:string){
            this.poNumber= poNumber;
            this.externalRefNo = externalRefNo
            this.poDateStartDate = poDateStartDate
            this.poDateEndDate  = poDateEndDate
            this.deliveryDateStartDate = deliveryDateStartDate
            this.deliveryDateEndDate = deliveryDateEndDate
            this.season = season
    }
}