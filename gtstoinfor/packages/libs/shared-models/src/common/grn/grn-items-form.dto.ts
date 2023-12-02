import { LocationMappedEnum, PoItemEnum } from "../../enum";
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
    rejectedQuantity?: number
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
    }

}