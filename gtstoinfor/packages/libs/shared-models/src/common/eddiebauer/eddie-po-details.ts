import { EddiePoItemDetails } from "./eddie-po-item-details";

export class EddiePoDetails {
    poNumber: string;
    poDate: string;
    deliveryDate: string;
    exFactoryDate: string;
    // incoterm: string;
    // shipToAdd:string;
    // manufacture:string;
    buyerAddress: string;
    deliveryAddress: string;
    // paymentTerms: string;
    // shipmentMode: string;


    EddiepoItemDetails: EddiePoItemDetails[]
}