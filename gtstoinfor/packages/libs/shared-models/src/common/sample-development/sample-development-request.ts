import { SampleDevelopmentStatusEnum } from "../../enum"
import { SizeInfo } from "./size-info"

export class SampleDevelopmentRequest{
    locationId : number
    styleId : number
    pchId : number
    buyerId : number
    sampleTypeId : number
    sampleSubTypeId : number 
    brandId : number
    costRef : any
    m3Style : string
    contact : number
    extension : any
    samValue : number 
    dmmId : number
    technician : number 
    product : string
    type : string
    conversion : any 
    madeIn : string
    sizeData : SizeInfo[]
    fabricInfo : []
    sampleRequestId? : number
    requestNo? : string
    facilityId? : number
    status? : SampleDevelopmentStatusEnum

    constructor(
        locationId : number,
        styleId : number,
        pchId : number,
        buyerId : number,
        sampleTypeId : number,
        sampleSubTypeId : number, 
        brandId : number,
        costRef : any,
        m3Style : string,
        contact : number,
        extension : any,
        samValue : number, 
        dmmId : number,
        technician : number, 
        product : string,
        type : string,
        conversion : any, 
        madeIn : string,
        sizeData : SizeInfo [],
        sampleRequestId? : number,
        requestNo? : string,
        facilityId? : number,
        status? : SampleDevelopmentStatusEnum,
    ){
        this.sampleRequestId = sampleRequestId
        this.locationId = locationId
        this.requestNo = requestNo
        this.styleId = styleId
        this.pchId = pchId
        this.buyerId = buyerId
        this.sampleTypeId = sampleTypeId
        this.sampleSubTypeId = sampleSubTypeId
        this.brandId = brandId
        this.costRef = costRef
        this.m3Style = m3Style
        this.contact = contact
        this.extension = extension
        this.samValue = samValue
        this.dmmId = dmmId
        this.technician = technician
        this.product = product
        this.type = type
        this.conversion = conversion
        this.madeIn = madeIn
        this.facilityId = facilityId
        this.status = status
        this.sizeData = sizeData
    }
}