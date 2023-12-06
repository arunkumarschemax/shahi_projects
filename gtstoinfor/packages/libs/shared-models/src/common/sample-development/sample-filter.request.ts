import { sample } from "rxjs";
import { MaterialStatusEnum, SampleDevelopmentStatusEnum } from "../../enum";

export class SampleFilterRequest{
    reqNo?:string;
    pch?: string
    styleNo?: string
    status?: SampleDevelopmentStatusEnum
    sampleId?: number
    extRefNumber?: string
    
    
    constructor( reqNo?:string,pch?: string, styleNo?: string, status?: SampleDevelopmentStatusEnum, sampleId?: number,extRefNumber?: string){
        this.reqNo = reqNo;
        this.pch = pch
        this.styleNo = styleNo
        this.status = status
        this.sampleId = sampleId
        this.extRefNumber = extRefNumber
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
    constructor(    
        buyerId?:number){
            this.buyerId=buyerId
        
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



