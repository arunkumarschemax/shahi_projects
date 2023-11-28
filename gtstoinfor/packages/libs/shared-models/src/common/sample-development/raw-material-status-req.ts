export class SamplerawmaterialStausReq{
    sampleReqNo:number
    buyerId:number
    styleId:number
    constructor(
        sampleReqNo?:number,
        buyerId?:number,
        styleId?:number
    ){
        this.sampleReqNo=sampleReqNo
        this.buyerId=buyerId
        this.styleId=styleId

    }
}