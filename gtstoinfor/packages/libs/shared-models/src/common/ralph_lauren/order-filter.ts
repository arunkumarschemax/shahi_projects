
export class PoOrderFilter {
    poNumber?: string;
    externalRefNo?:string
    poDateStartDate?:any
    poDateEndDate?:any
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any
    season?:string
    exportDateStartDate?:any
    exportDateEndDate?:any
    exfactoryDateStartDate?:any
    exfactoryDateEndDate?:any
    

    constructor(poNumber?: string, externalRefNo?:string ,poDateStartDate?:any,
        poDateEndDate?:any, deliveryDateStartDate?:any,
        deliveryDateEndDate?:any, season?:string, exportDateStartDate?:any,
        exportDateEndDate?:any,
        exfactoryDateStartDate?:any,
        exfactoryDateEndDate?:any){
            this.poNumber= poNumber;
            this.externalRefNo = externalRefNo
            this.poDateStartDate = poDateStartDate
            this.poDateEndDate  = poDateEndDate
            this.deliveryDateStartDate = deliveryDateStartDate
            this.deliveryDateEndDate = deliveryDateEndDate
            this.season = season
            this.exportDateStartDate = exportDateStartDate
            this.exportDateEndDate = exportDateEndDate
            this.exfactoryDateStartDate = exfactoryDateStartDate
            this.exfactoryDateEndDate = exfactoryDateEndDate
    }
}