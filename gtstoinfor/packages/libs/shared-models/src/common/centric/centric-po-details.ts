import { CentricPoItemDetails } from "./centric-po-item-details";

export class CentricPoDetails {
    poNumber: string;
    shipment: string;
    season: string;
    portOfExport: string;
    portOfEntry: string;
    Refrence: string;
    paymentTermDescription: string;
    specialInstructions: string;

    buyerAddress: string;
    sellerAddress: String;
    revisionNo: string;
    agent: string;
    dateSent: string;
    shipToAddress: string;
    poPrint: string;
    CentricpoItemDetails: CentricPoItemDetails[]
}