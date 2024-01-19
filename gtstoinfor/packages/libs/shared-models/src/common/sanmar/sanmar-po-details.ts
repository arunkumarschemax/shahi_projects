import { SanmarPoItemDetails } from "./sanmar-po-item-details";

export class SanmarPoDetails {
    poNumber: string;
    poDate: string;
    shipment: string;
    season: string;
    portOfExport: string;
    portOfEntry: string;
    Refrence: string;
    paymentTermDescription: string;
    specialInstructions: string;
    division:string;
    incoterm:string;
    shipToAdd:string;
    manufacture:string;
    // comptMaterial:string;


    buyerAddress: string;
    sellerAddress: string;
    revisionNo: string;
    agent: string;
    dateSent: string;
    shipToAddress: string;
    poPrint: string;
    SanmarpoItemDetails: SanmarPoItemDetails[]
}