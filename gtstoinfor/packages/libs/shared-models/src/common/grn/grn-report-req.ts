
export class grnReportReq{
    poStatus?:string
    poId?:number
    grnDate?:any
    sampleOrderId?:number
    indentId?:number
    tab?:string
    constructor(
        poStatus?:string,
        poId?:number,
        grnDate?:any,
        sampleOrderId?:number,
        indentId?:number,
        tab?:string
    ){
        this.poStatus=poStatus
        this.poId=poId
        this.grnDate=grnDate
        this.sampleOrderId=sampleOrderId
        this.indentId=indentId
        this.tab = tab
    }
}