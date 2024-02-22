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
    extn:string
    conversion: string
    dmmFirst:string
    product:string
    user:string
    description:string
    costRef:string
    type:string
    madeIn:string
    remarks?:string
    fileName?: string
    sam?:string
    // sizeinfo?:SampleSizeInfoModel[]
    fabInfo?:any[]
    trimInfo?:any[]
    processInfo?:any[]
    location?:string
    sampleType?:string
        sampleSubType?:string
        category?:string
    dmmLast?:string
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
        extn:string,
        conversion: string,
        dmmFirst:string,
        product:string,
        user:string,
        description:string,
        costRef:string,
        type:string,
        madeIn:string,
        remarks?:string,
        fileName?: string,
        sam?:string ,
        // conversion:'',
        // sizeinfo?:SampleSizeInfoModel[],
        fabInfo?:any[],
        trimInfo?:any[],
    processInfo?:any[],
        location?:string,
        sampleType?:string,
        sampleSubType?:string,
        category?:string,
        dmmLast?:string



    ){
       this.brand = brand
       this.buyer = buyer
       this.sampleRequestId = sampleRequestId
       this.sampleRequestNo = this.sampleRequestNo
    //    this.sizeinfo = sizeinfo
       this.style = style
       this.trimInfo = trimInfo
       this.processInfo = processInfo
       this.fabInfo = fabInfo
       this.sampleRequestNo = sampleRequestNo
       this.contact =contact
       this.status = status
       this.lifeCycleStatus = lifeCycleStatus
       this.employee = employee
       this.pch = pch
       this.ETD = ETD
       this.dmmFirst = dmmFirst
       this.extn = extn
       this.description = description
       this.costRef = costRef
       this.conversion = conversion
       this.remarks = remarks
       this.type = type
       this.madeIn = madeIn
       this.user = user
       this.product = product
       this.fileName = fileName
       this.sam = sam   
       this.location =location
       this.sampleType = sampleType
       this.sampleSubType = sampleSubType
       this.category =category
       this.dmmLast =dmmLast
        }



}