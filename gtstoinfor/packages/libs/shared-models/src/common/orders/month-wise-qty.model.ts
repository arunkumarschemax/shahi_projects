import { MonthAndQtyModel } from "./month-wise-data.model";

export class MonthWiseDataModel {
    itemCode: string;
    itemName: string;
    monthWiseData: MonthAndQtyModel[];
    constructor(itemCode: string, itemName: string, monthWiseData: MonthAndQtyModel[]) {
        this.itemCode = itemCode
        this.itemName = itemName
        this.monthWiseData = monthWiseData
    };
}