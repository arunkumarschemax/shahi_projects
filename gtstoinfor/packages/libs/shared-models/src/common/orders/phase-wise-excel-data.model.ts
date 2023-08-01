export class PhaseWiseExcelDataModel {
    itemCode: string;
    itemName: string;
    prodPlanTypeName: string;
    oldOrderQtyPcs: number;
    newOrderQtyPcs: number;
    difference: number;
    constructor(itemCode: string, itemName: string, prodPlanTypeName: string, oldOrderQtyPcs: number, newOrderQtyPcs: number, difference: number) {
        this.itemCode = itemCode
        this.itemName = itemName
        this.prodPlanTypeName = prodPlanTypeName
        this.oldOrderQtyPcs = oldOrderQtyPcs
        this.newOrderQtyPcs = newOrderQtyPcs
        this.difference = difference
    };
}