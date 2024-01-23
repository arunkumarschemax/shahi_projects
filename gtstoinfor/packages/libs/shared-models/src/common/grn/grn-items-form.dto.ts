import { ItemTypeEnum, LocationMappedEnum, LogoEnum, PartEnum, PoItemEnum } from "../../enum";
import { GrnItemsDto } from "./grn-items-dto"

export class GrnItemsFormDto {
    poItemId: number
    m3ItemCodeId: number
    m3ItemCode: string
    m3ItemType: string;
    m3ItemTypeId: number;
    poitemStatus: PoItemEnum;
    uomId: number;
    uom: string
    unitPrice: number
    discount: number
    tax: number
    transportation: number;
    subjectiveAmount: number;
    grnQuantity: number; // receivedQty in po items table
    poQuantity: number;
    colourId: number;
    colour: string;
    sampleItemId: number;
    indentItemId: number;
    buyer: string
    buyerId: number
    receivedQuantity?: number
    acceptedQuantity?: number
    categoryId?:number
    category: string
    colorId?: number
    color?: string
    contentId?: number
    content?: string
    finishId?: number
    finish?: string
    holeId?: number
    hole?: string
    logo?:LogoEnum
    part?:PartEnum
    qualityId?: number
    qualityName?: string
    structureId?: number
    structure?: string
    thicknessId?:number
    thickness: string
    typeId?: number
    type?: string
    UOMId?:number
    UOM?: string
    varietyId?: number
    variety?: string
    trimCategoryId?: number
    trimCategory?: string
    trimMappingId?: number
    styleId?: number
    trimParams?: string
    rejectedQuantity?: number | string
    rejectedUomId?: number
    conversionQuantity?: number
    conversionUomId?: number;
    remarks?: string;
    grnItemAmount?: number;
    sampleRequestId?: number;
    indentId?: number;
    createdAt?: Date;
    createdUser?: string | null;
    updatedAt?: Date;
    updatedUser?: string | null;
    versionFlag?: number;
    poId?:number
    itemType?:ItemTypeEnum
    description?:string

    constructor(
        poItemId: number,
        m3ItemCodeId: number,
        m3ItemCode: string,
        m3ItemType: string,
        m3ItemTypeId: number,
        poitemStatus: PoItemEnum,
        uomId: number,
        uom: string,
        unitPrice: number,
        discount: number,
        tax: number,
        transportation: number,
        subjectiveAmount: number,
        grnQuantity: number,
        poQuantity: number,
        colourId: number,
        colour: string,
        sampleItemId: number,
        indentItemId: number,
        buyerId: number,
        buyer: string,
        sampleRequestId?: number,
        indentId?: number,
        receivedQuantity?: number,
        acceptedQuantity?: number,
        categoryId?:number,
        category?: string,
        colorId?: number,
        color?: string,
        contentId?: number,
        content?: string,
        finishId?: number,
        finish?: string,
        holeId?: number,
        hole?: string,
        logo?:LogoEnum,
        part?:PartEnum,
        qualityId?: number,
        qualityName?: string,
        structureId?: number,
        structure?: string,
        thicknessId?:number,
        thickness?: string,
        typeId?: number,
        type?: string,
        UOMId?:number,
        UOM?: string,
        varietyId?: number,
        variety?: string,
        trimCategoryId?: number,
        trimCategory?: string,
        trimMappingId?: number,
        styleId?: number,
        trimParams?:string,
        rejectedQuantity?: number,
        rejectedUomId?: number,
        conversionUomId?: number,
        conversionQuantity?: number,
        remarks?: string,
        grnItemAmount?: number,
        createdAt?: Date,
        createdUser?: string | null,
        updatedAt?: Date,
        updatedUser?: string | null,
        versionFlag?: number,
        poId?:number,itemType?:ItemTypeEnum,description?:string
    ) {
        this.poItemId = poItemId;
        this.m3ItemCode = m3ItemCode;
        this.m3ItemCodeId = m3ItemCodeId;
        this.m3ItemType = m3ItemType;
        this.m3ItemTypeId = m3ItemTypeId;
        this.poitemStatus = poitemStatus;
        this.uomId = uomId;
        this.uom = uom;
        this.unitPrice = unitPrice;
        this.discount = discount;
        this.tax = tax;
        this.transportation = transportation;
        this.subjectiveAmount = subjectiveAmount;
        this.grnQuantity = grnQuantity;
        this.poQuantity = poQuantity;
        this.colourId = colourId;
        this.colour = colour;
        this.sampleItemId = sampleItemId;
        this.indentItemId = indentItemId;
        this.receivedQuantity = receivedQuantity;
        this.acceptedQuantity = acceptedQuantity;
        this.categoryId = categoryId
        this.category =category
        this.colorId =colorId
        this.color =color
        this.contentId =contentId
        this.content =content
        this.finishId =finishId
        this.finish =finish
        this.holeId =holeId
        this.hole =hole
        this.logo =logo
        this.part =part
        this.qualityId =qualityId
        this.qualityName =qualityName
        this.structureId =structureId
        this.structure =structure
        this.thicknessId = thicknessId
        this.thickness = thickness
        this.typeId = typeId
        this.type = type
        this.UOMId = UOMId
        this.UOM = UOM
        this.varietyId =varietyId
        this.variety =variety
        this.trimCategoryId =trimCategoryId
        this.trimCategory =trimCategory
        this.trimMappingId =trimMappingId
        this.styleId = styleId
        this.rejectedQuantity = rejectedQuantity;
        this.rejectedUomId = rejectedUomId;
        this.conversionQuantity = conversionQuantity
        this.conversionUomId = conversionUomId;
        this.remarks = remarks;
        this.createdAt = createdAt;
        this.createdUser = createdUser;
        this.updatedAt = updatedAt;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.buyerId = buyerId;
        this.buyer = buyer
        this.grnItemAmount = grnItemAmount
        this.sampleRequestId = sampleRequestId
        this.indentId = indentId
        this.trimParams =trimParams
        this.poId = poId
        this.itemType = itemType
        this.description = description
    }

}