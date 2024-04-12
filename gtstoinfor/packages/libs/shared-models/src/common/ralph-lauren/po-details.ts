import { PoItemDetails } from "./po-item-details";

export class RLPoDetails {
    poNumber: string;
    buyerAddress: string;
    sellerAddress: String;
    revisionNo: string;
    agent: string;
    purchaseGroup: string;
    orderType: string;
    paymentCategory: string;
    plant: string;
    mfgOrigin: string;
    poPrint: string;
    poIssue: string;
    poContact: string;
    dateSent: string;
    shipToAddress: string;
    poItemDetails: PoItemDetails[]
}