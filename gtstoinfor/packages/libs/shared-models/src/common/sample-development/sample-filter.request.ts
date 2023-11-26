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
    constructor(    
        buyerId:number,
        m3ItemId:number){
            this.buyerId=buyerId
            this.m3ItemId=m3ItemId
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

