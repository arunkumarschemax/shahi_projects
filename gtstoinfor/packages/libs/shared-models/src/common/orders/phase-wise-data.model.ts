export class PhaseAndQtyModel {
    prodPlanTypeName: string;
    oldOrderQtyPcs4: number;
    oldOrderQtyPcs3: number;
    oldOrderQtyPcs2: number;
    oldOrderQtyPcs1: number;
    oldOrderQtyPcs: number;
    newOrderQtyPcs: number;
    constructor(prodPlanTypeName: string, oldOrderQtyPcs4: number, oldOrderQtyPcs3: number, oldOrderQtyPcs2: number, oldOrderQtyPcs1: number, oldOrderQtyPcs: number, newOrderQtyPcs: number) {
        this.prodPlanTypeName = prodPlanTypeName;
        this.oldOrderQtyPcs4 = oldOrderQtyPcs4;
        this.oldOrderQtyPcs3 = oldOrderQtyPcs3;
        this.oldOrderQtyPcs2 = oldOrderQtyPcs2;
        this.oldOrderQtyPcs1 = oldOrderQtyPcs1;
        this.oldOrderQtyPcs = oldOrderQtyPcs;
        this.newOrderQtyPcs = newOrderQtyPcs
    };
}