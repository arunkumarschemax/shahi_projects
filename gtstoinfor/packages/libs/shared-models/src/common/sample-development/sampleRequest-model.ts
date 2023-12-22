import { SampleSizeInfoModel } from "./sampleSize-model";

export class SampleRequestInfoModel{
    sampleRequestNo: string
    sampleRequestId:number
    style:string
    brand: string;
    buyer:string
    sizeinfo?:SampleSizeInfoModel[]
    fabInfo?:any[]
    trimInfo?:any[]
    
    constructor(
        sampleRequestNo: string,
        sampleRequestId:number,
        style:string,
        brand: string,
        buyer:string,
        sizeinfo?:SampleSizeInfoModel[],
        fabInfo?:any[],
        trimInfo?:any[]
    ){
       this.brand = brand
       this.buyer = buyer
       this.sampleRequestId = sampleRequestId
       this.sampleRequestNo = this.sampleRequestNo
       this.sizeinfo = sizeinfo
       this.style = style
       this.trimInfo = trimInfo
       this.fabInfo = fabInfo
       this.sampleRequestNo = sampleRequestNo
        }



}