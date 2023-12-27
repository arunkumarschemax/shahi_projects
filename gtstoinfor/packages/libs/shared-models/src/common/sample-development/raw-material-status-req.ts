export class SamplerawmaterialStausReq{
    sampleReqNo:number
    buyerId:number
    styleId:number
    extRefNo?:string
    tab?:string
    constructor(
        sampleReqNo?:number,
        buyerId?:number,
        styleId?:number,
        extRefNo?:string,
        tab?:string
    ){
        this.sampleReqNo=sampleReqNo
        this.buyerId=buyerId
        this.styleId=styleId
        this.extRefNo=extRefNo
        this.tab = tab
    }
}