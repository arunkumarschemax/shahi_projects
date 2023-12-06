import { sample } from "rxjs";
import { LifeCycleStatusEnum, MaterialStatusEnum, SampleDevelopmentStatusEnum } from "../../enum";

export class SampleFilterRequest{
    reqNo?:string;
    pch?: string
    styleNo?: string
    status?: SampleDevelopmentStatusEnum
    sampleId?: number
    
    constructor( reqNo?:string,pch?: string, styleNo?: string, status?: SampleDevelopmentStatusEnum, sampleId?: number){
        this.reqNo = reqNo;
        this.pch = pch
        this.styleNo = styleNo
        this.status = status
        this.sampleId = sampleId
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

status?:LifeCycleStatusEnum
id?:number
dipatchedDate?:Date
constructor(
    status?:LifeCycleStatusEnum,
    id?:number,
dispatchedDate?:Date

){
    this.status=status
    this.id= id
    this.dipatchedDate=dispatchedDate
}

}


