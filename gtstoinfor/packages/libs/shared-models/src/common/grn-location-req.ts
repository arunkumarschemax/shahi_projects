// export class GRNLocationPropsRequest {
//     grnUnitId: number 
//     vendorId: number
//     vendorName: string
//     itemId: number
//     itemName: string
//     brandId: number
//     invoiceNumber:string
//     receivedQty:number
//     saleOrderId:number
//     itemCategoryId:number
//     itemSubCategoryId:number
//     unitPrice:number
//     grnId:number
//     grnItemId:number
//     sizeId:number
//     poId:number
//     locationId?:number
//     physicalQuantity?:number
//     locationStatus?:string
//     createdUser?:string
//     grnNo?:string
//     balance?:number
//     constructor(grnUnitId: number,vendorId: number,vendorName: string,itemId: number,itemName: string,brandId: number,invoiceNumber:string,receivedQty:number,saleOrderId:number,itemCategoryId:number,itemSubCategoryId:number,unitPrice:number,grnId:number,grnItemId:number,sizeId:number,poId:number,locationId?:number,physicalQuantity?:number,locationStatus?:string,createdUser?:string,grnNo?:string,balance?:number) {
//         this.grnUnitId = grnUnitId
//         this.vendorId = vendorId
//         this.vendorName = vendorName
//         this.itemId = itemId
//         this.itemName = itemName
//         this.brandId = brandId
//         this.invoiceNumber = invoiceNumber
//         this.receivedQty = receivedQty
//         this.saleOrderId = saleOrderId
//         this.itemCategoryId = itemCategoryId
//         this.itemSubCategoryId = itemSubCategoryId
//         this.unitPrice = unitPrice
//         this.locationId = locationId
//         this.physicalQuantity = physicalQuantity
//         this.locationStatus = locationStatus
//         this.grnId = grnId
//         this.grnItemId = grnItemId
//         this.poId = poId
//         this.sizeId = sizeId
//         this.createdUser = createdUser
//         this.grnNo=grnNo
//         this.balance=balance
//     }
// }


export class GRNLocationPropsRequest {
    grn_item_id:number;
    grnNumber: string;
    vendorName: string;
    materialType: string;
    item: string;
    receivedQuantity: number;
    physicalQuantity: number;
    balance: number;
    constructor(grn_item_id:number,grnNumber: string, vendorName: string, materialType: string, item: string, receivedQuantity: number, physicalQuantity: number, balance: number,) {
        this.grn_item_id = grn_item_id;
        this.grnNumber = grnNumber;
        this.vendorName = vendorName;
        this.materialType = materialType;
        this.item = item;
        this.receivedQuantity = receivedQuantity;
        this.physicalQuantity = physicalQuantity;
        this.balance = balance;
    }
}
