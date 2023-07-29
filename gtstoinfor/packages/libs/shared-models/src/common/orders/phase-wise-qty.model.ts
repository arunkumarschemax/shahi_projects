import { PhaseAndQtyModel } from "./phase-wise-data.model";

export class PhaseWiseDataModel {
    itemCode: string;
    itemName: string;
    phaseWiseData: PhaseAndQtyModel[];
    constructor(itemCode: string, itemName: string, phaseWiseData: PhaseAndQtyModel[]) {
        this.itemCode = itemCode
        this.itemName = itemName
        this.phaseWiseData = phaseWiseData
    };
}