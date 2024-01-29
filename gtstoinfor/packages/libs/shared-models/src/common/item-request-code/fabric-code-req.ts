export class FabricCodeReq{
    buyerId?: number
    hsnCode?: string
    fabricTypeId?:number
    weaveId?:number
    finishType?:number
    contentId?:number
    status?: any

    constructor(
        buyerId?: number,
        hsnCode?: string,
        fabricTypeId?:number,
        weaveId?:number,
        finishType?:number,
        contentId?:number,
        status?: any
    ){
        this.buyerId = buyerId
        this.hsnCode =  hsnCode
        this.fabricTypeId = fabricTypeId
        this.weaveId = weaveId
        this.finishType = finishType
        this.contentId = contentId
        this.status = status
    }
}