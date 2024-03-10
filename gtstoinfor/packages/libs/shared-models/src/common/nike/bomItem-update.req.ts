// export class BomItemReq {
//     purchaseOrderNumber?: string;
//     poLineItemNumber?: number;
//     itemNo?: string;
//     id?:number;
//     bomItem?:string;
// }
export class BomItemReq {
    purchaseOrderNumber?: string;
    poLineItemNumber?: string[];
    itemNo?: string;
    id?:  number[];  
    bomItem?: string;
    poAndLine : string[]
}

