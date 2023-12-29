
export class grnReportReq{
    poStatus?:string
    poId?:number
    grnDate?:any
    sampleOrderId?:number
    indentId?:number
    constructor(
        poStatus?:string,
        poId?:number,
        grnDate?:any,
        sampleOrderId?:number,
        indentId?:number
    ){
        this.poStatus=poStatus
        this.poId=poId
        this.grnDate=grnDate
        this.sampleOrderId=sampleOrderId
        this.indentId=indentId
    }
}