import { SampleSizeInfoModel } from "./sampleSize-model";

export class SampleRequestInfoModel{
    sampleRequestNo: string
    sampleRequestId:number
    style:string
    brand: string;
    buyer:string
    employee:string
    status:string
    pch:string
    lifeCycleStatus:string
    contact:string
    ETD:Date
    // sizeinfo?:SampleSizeInfoModel[]
    fabInfo?:any[]
    trimInfo?:any[]
    
    constructor(
        sampleRequestNo: string,
        sampleRequestId:number,
        style:string,
        brand: string,
        buyer:string,
        employee:string,
        status:string,
        lifeCycleStatus:string,
        contact:string,
        pch:string,
        ETD:Date,
        // conversion:'',
        // sizeinfo?:SampleSizeInfoModel[],
        fabInfo?:any[],
        trimInfo?:any[]
    ){
       this.brand = brand
       this.buyer = buyer
       this.sampleRequestId = sampleRequestId
       this.sampleRequestNo = this.sampleRequestNo
    //    this.sizeinfo = sizeinfo
       this.style = style
       this.trimInfo = trimInfo
       this.fabInfo = fabInfo
       this.sampleRequestNo = sampleRequestNo
       this.contact =contact
       this.status = status
       this.lifeCycleStatus = lifeCycleStatus
       this.employee = employee
       this.pch = pch
       this.ETD = ETD
        }



}