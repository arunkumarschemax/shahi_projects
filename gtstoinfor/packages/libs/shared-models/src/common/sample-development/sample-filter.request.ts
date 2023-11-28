import { MaterialStatusEnum, SampleDevelopmentStatusEnum } from "../../enum";

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
    constructor(    
        buyerId?:number){
            this.buyerId=buyerId
        
    }

    
}


export class statusReq{
    materialAllocationId?:number
    status?:MaterialStatusEnum

    constructor(    
        materialAllocationId?:number,
        status?:MaterialStatusEnum
        ){  
            this.materialAllocationId = materialAllocationId
            this.status=status
        
    }

    
}

export class sampleReqIdReq{
    sampleReqId:number
    constructor(sampleReqId:number){
        this.sampleReqId=sampleReqId
    }
}

