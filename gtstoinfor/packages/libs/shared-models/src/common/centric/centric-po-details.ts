import { CentricPoItemDetails } from "./centric-po-item-details";

export class CentricPoDetails {
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
    comptMaterial:string;


    buyerAddress: string;
    sellerAddress: String;
    revisionNo: string;
    agent: string;
    dateSent: string;
    shipToAddress: string;
    poPrint: string;
    CentricpoItemDetails: CentricPoItemDetails[]
}