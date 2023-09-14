import { PoItemVariantDto } from "./legal-po-item-variant-details";

export class PoItemDetailsDto {
    itemNo: string;
    matrial: string;
    description: string;
    deliveryDate: string;
    mode: string;
    acceptanceDate: string;
    shipToAddress: string;
    itemVasText: string;
    totalQuantity:string;
    totalPrice:string;
    poItemVariantDetails: PoItemVariantDto[]
    
}