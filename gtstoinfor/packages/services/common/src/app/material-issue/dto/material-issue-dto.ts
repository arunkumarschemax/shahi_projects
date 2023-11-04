import { ApiProperty } from "@nestjs/swagger";
import { MaterialFabricDto } from "./material-fabric-dto";
import { MaterialTrimDto } from "./material-trim-dto";

export class MaterialIssueDto{
    @ApiProperty()
    materialIssueId:number;

    @ApiProperty()
    consumptionCode:string;

    @ApiProperty()
    requestNo: string

    @ApiProperty()
    locationId:number;

    @ApiProperty()
    pchId:number;

    @ApiProperty()
    buyerId:number;

    @ApiProperty()
    sampleTypeId:number;

    @ApiProperty()
    sampleSubTypeId:number;

    @ApiProperty()
    styleNo:string;

    @ApiProperty()
    brandId:number;

    @ApiProperty()
    dmmId:number;

    @ApiProperty()
    technicianId:number;

    @ApiProperty()
    description:string;

    @ApiProperty()
    costRef:string;

    @ApiProperty()
    m3StyleNo:string;

    @ApiProperty()
    contact:string;

    @ApiProperty()
    extn:string;

    @ApiProperty()
    SAM:number;

    @ApiProperty()
    product:string;

    @ApiProperty()
    type:string;

    @ApiProperty()
    conversion:string;

    @ApiProperty()
    madeIn:string;

    @ApiProperty()
    remarks:string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty({type: [MaterialFabricDto]})
    fabricInfo: MaterialFabricDto[]

    @ApiProperty({type: [MaterialTrimDto]})
    trimInfo: MaterialTrimDto[]

    constructor(
        materialIssueId:number,
        consumptionCode:string,
        requestNo: string,
        locationId:number,
        pchId:number,
        buyerId:number,
        sampleTypeId:number,
        sampleSubTypeId:number,
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
        this.locationId = locationId
        this.pchId = pchId
        this.buyerId = buyerId
        this.sampleTypeId = sampleTypeId
        this.sampleSubTypeId = sampleSubTypeId
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