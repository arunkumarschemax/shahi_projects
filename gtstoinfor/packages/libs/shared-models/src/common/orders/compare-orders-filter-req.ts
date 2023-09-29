export class CompareOrdersFilterReq {
     orderNumber?: string;
     itemCode?: string;
     itemName?: string;

     constructor(orderNumber?: string,itemCode?: string,itemName?: string){
        this.orderNumber = orderNumber;
        this.itemCode = itemCode;
        this.itemName = itemName;
     }
}