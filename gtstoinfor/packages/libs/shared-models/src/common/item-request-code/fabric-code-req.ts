export class FabricCodeReq{
    buyerId?: number
    hsnCode?: string
    fabricTypeId?:number
    weaveId?:number
    finishType?:number
    contentId?:number
    status?: any
    ExternalRefNo?:string
    constructor(
        buyerId?: number,
        hsnCode?: string,
        fabricTypeId?:number,
        weaveId?:number,
        finishType?:number,
        contentId?:number,
        status?: any,
        ExternalRefNo?:string

    ){
        this.buyerId = buyerId
        this.hsnCode =  hsnCode
        this.fabricTypeId = fabricTypeId
        this.weaveId = weaveId
        this.finishType = finishType
        this.contentId = contentId
        this.status = status
        this.ExternalRefNo = ExternalRefNo
    }
}