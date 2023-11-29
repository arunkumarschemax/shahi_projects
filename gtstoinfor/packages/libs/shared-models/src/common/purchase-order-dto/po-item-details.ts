import { PoItemEnum } from "../../enum"

export class PoItemDetailsDto {
    purchaseOrderItemId: number;
    colourId: number;
    m3ItemId: number; 
    poQuantity: number;
    quantityUomId: number;
    poitemStatus: PoItemEnum;
    grnQuantity: number;
    sampleItemId: number;
    indentItemId: number; 
    unitPrice: number;
    discount: number;
    tax: number;
    transportation: number;
    subjectiveAmount: number;
    constructor(
        purchaseOrderItemId: number,
        colourId: number,
        m3ItemId: number,
        poQuantity: number,
        quantityUomId: number,
        poitemStatus: PoItemEnum,
        grnQuantity: number,
        sampleItemId: number,
        indentItemId: number,
        unitPrice: number,
        discount: number,
        tax: number,
        transportation: number,
        subjectiveAmount: number
    ){
   this.purchaseOrderItemId = purchaseOrderItemId
   this.colourId = colourId
   this.m3ItemId = m3ItemId
   this.poQuantity = poQuantity
   this.quantityUomId = quantityUomId
   this.poitemStatus = poitemStatus
   this.grnQuantity = grnQuantity
   this.sampleItemId = sampleItemId
   this.indentItemId = indentItemId
   this.unitPrice = unitPrice
   this.discount = discount
   this.tax = tax
   this.transportation = transportation
   this.subjectiveAmount = subjectiveAmount
    }
}