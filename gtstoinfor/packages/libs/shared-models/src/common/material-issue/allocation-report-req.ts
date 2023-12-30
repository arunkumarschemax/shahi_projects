export class AllocationReportReq{
    requestNo?: string
    rackPosition?: string
    constructor(
        requestNo?: string,
        rackPosition?: string
    ){
        this.requestNo = requestNo
        this.rackPosition = rackPosition
    }
}