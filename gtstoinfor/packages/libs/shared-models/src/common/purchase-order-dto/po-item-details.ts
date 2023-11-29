import { PoItemEnum } from "../../enum"

export class PoItemDetailsDto {
    purchaseOrderItemId: number
    colourId: number
    m3ItemId: number
    poQuantity: number
    quantityUomId: number
    poitemStatus: PoItemEnum
    grnQuantity: number
    sampleItemId: number
    indentItemId: number
    unitPrice: number
    discount: number
    tax: number
    transportation: number
    subjectiveAmount: number
    createdUser: string | null;
    updatedUser: string | null;
    versionFlag: number;
    isActive: boolean;
}