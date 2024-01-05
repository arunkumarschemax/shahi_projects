export class OrderAcceptanceRequest {
    purchaseOrderNumber: string;
    poLineItemNumber: number;
    itemNo: string;
    buyer: string;
    createdUser?:string
    
}