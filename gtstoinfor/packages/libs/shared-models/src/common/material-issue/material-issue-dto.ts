import { MaterialFabricDto } from "./material-fabric-dto";
import { MaterialTrimDto } from "./material-trim-dto";

export class MaterialIssueDto{
    materialIssueId:number;
    consumptionCode:string;
    requestNo: string
    poNumber: string
    issueDate: Date
    locationId:number;
    pchId:number;
    buyerId:number;
    sampleTypeId:number;
    sampleSubTypeId:number;
    styleId:number
    styleNo:string;
    brandId:number;
    dmmId:number;
    technicianId:number;
    description:string;
    costRef:string;
    m3StyleNo:string;
    contact:string;
    extn:string;
    SAM:number;
    product:string;
    type:string;
    conversion:string;
    madeIn:string;
    remarks:string;
    createdAt: Date;
    createdUser: string | null;
    fabricInfo: MaterialFabricDto[]
    trimInfo: MaterialTrimDto[]

    constructor(
        materialIssueId:number,
        consumptionCode:string,
        requestNo: string,
        poNumber: string,
        issueDate: Date,
        locationId:number,
        pchId:number,
        buyerId:number,
        sampleTypeId:number,
        sampleSubTypeId:number,
        styleId: number,
        styleNo:string,
        brandId:number,
        dmmId:number,
        technicianId:number,
        description:string,
        costRef:string,
        m3StyleNo:string,
        contact:string,
        extn:string,
        SAM:number,
        product:string,
        type:string,
        conversion:string,
        madeIn:string,
        remarks:string,
        createdAt: Date,
        createdUser: string | null,
        fabricInfo: MaterialFabricDto[],
        trimInfo: MaterialTrimDto[]
    ){
        this.materialIssueId = materialIssueId
        this.consumptionCode = consumptionCode
        this.requestNo = requestNo
        this.poNumber = poNumber
        this.issueDate = issueDate
        this.locationId = locationId
        this.pchId = pchId
        this.buyerId = buyerId
        this.sampleTypeId = sampleTypeId
        this.sampleSubTypeId = sampleSubTypeId
        this.styleId = styleId
        this.styleNo = styleNo
        this.brandId = brandId
        this.dmmId = dmmId
        this.technicianId = technicianId
        this.description = description
        this.costRef = costRef
        this.m3StyleNo = m3StyleNo
        this.contact = contact
        this.extn = extn
        this.SAM = SAM
        this.product = product
        this.type = type
        this.conversion = conversion
        this.madeIn = madeIn
        this.remarks = remarks
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.fabricInfo = fabricInfo
        this.trimInfo = trimInfo
    }
}