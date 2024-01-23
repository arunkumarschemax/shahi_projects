import { BomPoItemVariant } from "./bom-po-item-variant";

export class BomPoItemDetails {

    poLine: string;
    material: string;
    color: string;
    gender: string;
    shortDescription:string;
    packMethod:string;
    vendorBookingFlag:string;
    
    ppkupc:string;
    currency:string;
    totalQuantity:string

    BompoItemVariantDetails: BomPoItemVariant[]

}