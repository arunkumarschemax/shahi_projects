export class PhaseWiseExcelDataModel {
    itemCode: string;
    itemName: string;
    prodPlanTypeName: string;
    oldOrderQtyPcs3: number;
    oldOrderQtyPcs2: number;
    oldOrderQtyPcs1: number;
    oldOrderQtyPcs: number;
    newOrderQtyPcs: number;
    difference: number;
    constructor(itemCode: string, itemName: string, prodPlanTypeName: string, oldOrderQtyPcs3: number, oldOrderQtyPcs2: number, oldOrderQtyPcs1: number, oldOrderQtyPcs: number, newOrderQtyPcs: number, difference: number) {
        this.itemCode = itemCode
        this.itemName = itemName
        this.prodPlanTypeName = prodPlanTypeName
        this.oldOrderQtyPcs3 = oldOrderQtyPcs3
        this.oldOrderQtyPcs2 = oldOrderQtyPcs2
        this.oldOrderQtyPcs1 = oldOrderQtyPcs1
        this.oldOrderQtyPcs = oldOrderQtyPcs
        this.newOrderQtyPcs = newOrderQtyPcs
        this.difference = difference
    };
}