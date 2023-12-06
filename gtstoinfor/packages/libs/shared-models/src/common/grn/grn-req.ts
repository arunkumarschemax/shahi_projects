
export class GrnReq{
    grnId?:number;
    itemType?:string
    grnNo?: string
    poNumber?: string
    status?: string
    fromDate?: Date
    toDate?: Date
    extRefNumber?: string

    constructor(
        grnId?:number,
        itemType?:string,
        grnNo?: string,
        poNumber?: string,
        status?: string,
        fromDate?: Date,
        toDate?: Date,
        extRefNumber?: string

    ){
        this.grnId = grnId;
        this.itemType = itemType
        this.grnNo = grnNo
        this.poNumber = poNumber
        this.status = status
        this.fromDate = fromDate
        this.toDate = toDate
        this.extRefNumber = extRefNumber
    }
}