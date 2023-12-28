
export class grnReportReq{
    poStatus?:string
    poId?:number
    grnDate?:any
    constructor(
        poStatus?:string,
        poId?:number,
        grnDate?:any
    ){
        this.poStatus=poStatus
        this.poId=poId
        this.grnDate=grnDate
    }
}