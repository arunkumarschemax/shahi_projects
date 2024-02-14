import { sample } from "rxjs";
import { LifeCycleStatusEnum, MaterialStatusEnum, SampleDevelopmentStatusEnum } from "../../enum";

export class SampleFilterRequest{
    reqNo?:string;
    pch?: string
    styleNo?: string
    status?: SampleDevelopmentStatusEnum
    sampleId?: number
    extRefNumber?: string
    user?:string
    
    
    constructor( reqNo?:string,pch?: string, styleNo?: string, status?: SampleDevelopmentStatusEnum, sampleId?: number,extRefNumber?: string,user?:string){
        this.reqNo = reqNo;
        this.pch = pch
        this.styleNo = styleNo
        this.status = status
        this.sampleId = sampleId
        this.extRefNumber = extRefNumber
        this.user = user
    }
}


export class buyerandM3ItemIdReq{
    buyerId:number
    m3ItemId:number
    itemType?:string
    constructor(    
        buyerId:number,
        m3ItemId:number,
        itemType?:string
        ){
            this.buyerId=buyerId
            this.m3ItemId=m3ItemId
            this.itemType=itemType
    }

    
}


export class buyerReq{
    buyerId?:number
    extRefNo?:string
    constructor(    
        buyerId?:number,extRefNo?:string){
            this.buyerId=buyerId
            this.extRefNo=extRefNo
    }

    
}


export class statusReq{
    materialAllocationId?:number
    status?:MaterialStatusEnum
    stockId?:number
    allocateQuanty?:number

    constructor(    
        materialAllocationId?:number,
        status?:MaterialStatusEnum,
        stockId?:number,
        allocateQuanty?:number
        ){  
            this.materialAllocationId = materialAllocationId
            this.status=status
            this.stockId = stockId
            this.allocateQuanty =  allocateQuanty
        
    }

    
}

export class sampleReqIdReq{
    sampleReqId:number
    sampleItemId:number
    constructor(sampleReqId:number,
    sampleItemId:number
        ){
        this.sampleReqId=sampleReqId
        this.sampleItemId=sampleItemId
    }
}

export class lifeCycleStatusReq{
sampleReqId? :number
status?:LifeCycleStatusEnum
dipatchedDate?:string
constructor(
    sampleReqId?:number,
    status?:LifeCycleStatusEnum,
dispatchedDate?:string

){  this.sampleReqId = sampleReqId
    this.status=status
    this.dipatchedDate=dispatchedDate
}

}


