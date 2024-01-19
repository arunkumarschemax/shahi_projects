import { CategoryEnum, SampleDevelopmentStatusEnum } from "../../enum"
import { SampleFabricReq } from "./sample-dev-fabric-info-req";
import { SampleProcessInfoReq } from "./sample-dev-process-info-req";
import { SampleTrimReq } from "./sample-dev-trim-req";
import { SizeInfo } from "./size-info"

export class SampleDevelopmentRequest {
    sampleRequestId: number;
    locationId: string;
    requestNo: string;
    expectedDeliveryDate:Date;
    pchId: number;
    user: string;
    buyerId: number;
    sampleTypeId: number;
    sampleSubTypeId: number;
    styleId: number;
    description: string;
    brandId: number;
    costRef: string;
    m3Style: string;
    contact: string;
    extension: string;
    samValue: number;
    dmmId: number;
    technicianId: number;
    product: number;
    type: number;
    conversion: string;
    madeIn: number;
    remarks: string;
    sizeData: SizeInfo[];
    fabricInfo: SampleFabricReq[];
    trimInfo: SampleTrimReq[];
    processInfo: SampleProcessInfoReq[];
    status?: SampleDevelopmentStatusEnum
    fileName?:string;
    filePath?:string;
    createdAt:string
    category?:CategoryEnum
    subType?:string

    constructor(
        sampleRequestId: number,
        locationId: string,
        requestNo: string,
        expectedDeliveryDate:Date,
        pchId: number,
        user: string,
        buyerId: number,
        sampleTypeId: number,
        sampleSubTypeId: number,
        styleId: number,
        description: string,
        brandId: number,
        costRef: string,
        m3Style: string,
        contact: string,
        extension: string,
        samValue: number,
        dmmId: number,
        technicianId: number,
        product: number,
        type: number,
        conversion: string,
        madeIn: number,
        remarks: string,
        sizeData: SizeInfo[],
        fabricInfo: SampleFabricReq[],
        trimInfo: SampleTrimReq[],
        processInfo: SampleProcessInfoReq[],
        status?: SampleDevelopmentStatusEnum,
        fileName?:string,
        filePath?:string,
        category?:CategoryEnum,
        subType?: string
    ) {
        this.sampleRequestId = sampleRequestId
        this.locationId = locationId
        this.requestNo = requestNo
        this.expectedDeliveryDate = expectedDeliveryDate
        this.styleId = styleId
        this.pchId = pchId
        this.buyerId = buyerId
        this.user = user
        this.sampleTypeId = sampleTypeId
        this.sampleSubTypeId = sampleSubTypeId
        this.brandId = brandId
        this.costRef = costRef
        this.m3Style = m3Style
        this.contact = contact
        this.extension = extension
        this.samValue = samValue
        this.dmmId = dmmId
        this.technicianId = technicianId
        this.product = product
        this.type = type
        this.conversion = conversion
        this.madeIn = madeIn
        this.status = status
        this.sizeData = sizeData
        this.remarks = remarks
        this.description = description
        this.fabricInfo = fabricInfo
        this.trimInfo = trimInfo
        this.processInfo = processInfo
        this.fileName=fileName
        this.filePath=filePath
        this.category = category
        this.subType = subType
    }
}