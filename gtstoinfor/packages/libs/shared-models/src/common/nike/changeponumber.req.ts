import { OrderChangePoModel } from "./change-ord-sizes.req";

export class ChangePoandLineModel {
    purchaseOrderNumber: string;
    poAndLine: string;
  
    sizeWiseData: OrderChangePoModel[];
 
    constructor(purchaseOrderNumber: string,poAndLine: string,        sizeWiseData: OrderChangePoModel[] ) {
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poAndLine = poAndLine
        this.sizeWiseData = sizeWiseData
       
    };
}