import { EddiePoItemDetails } from "./eddie-po-item-details";

export class EddiePoDetails {
    poNumber: string;
    poDate: string;
    incoterm: string;
    shipToAdd:string;
    manufacture:string;
    buyerAddress: string;
    paymentTerms: string;
    shipmentMode: string;

    
    EddiepoItemDetails: EddiePoItemDetails[]
}