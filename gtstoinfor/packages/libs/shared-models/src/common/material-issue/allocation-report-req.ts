export class AllocationReportReq{
    requestNo?: string
    rackPosition?: string
    extRefNo?:string

    constructor(
        requestNo?: string,
        rackPosition?: string,
        extRefNo?:string

    ){
        this.requestNo = requestNo
        this.rackPosition = rackPosition
        this.extRefNo = extRefNo
    }
}