export class PhaseAndQtyModel {
    prodPlanTypeName: string;
    oldOrderQtyPcs: number;
    newOrderQtyPcs: number;
    constructor(prodPlanTypeName: string, oldOrderQtyPcs: number, newOrderQtyPcs: number) {
        this.prodPlanTypeName = prodPlanTypeName;
        this.oldOrderQtyPcs = oldOrderQtyPcs;
        this.newOrderQtyPcs = newOrderQtyPcs
    };
}