export class SamplerawmaterialStausReq{
    sampleReqNo:number
    buyerId:number
    styleId:number
    extRefNo?:string
    constructor(
        sampleReqNo?:number,
        buyerId?:number,
        styleId?:number,
        extRefNo?:string
    ){
        this.sampleReqNo=sampleReqNo
        this.buyerId=buyerId
        this.styleId=styleId
        this.extRefNo=extRefNo

    }
}