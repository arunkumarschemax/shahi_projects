import { PvhPoItemDetails } from "./pvh-po-item-details";

export class PvhPoDetails {
    poNumber: string;
    deliveryAddress: string;
    currency: string;
    poRemarks: string;
    splitPo: string;
    totalQuantity:string;
    splitPoTotalQuantity:string;

    PvhpoItemDetails: PvhPoItemDetails[]
}