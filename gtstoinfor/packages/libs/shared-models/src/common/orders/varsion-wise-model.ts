import { VersionAndQtyModel } from "./version-qty-model";

export class VersionDataModel {
    productionPlanId: number;
    prodPlanTypeName: string;
    itemCode: string;
    itemName: string;
    versionWiseData: VersionAndQtyModel[];
    constructor(productionPlanId: number, prodPlanTypeName: string, itemCode: string, itemName: string, versionWiseData: VersionAndQtyModel[]) {
        this.itemCode = itemCode
        this.itemName = itemName
        this.productionPlanId = productionPlanId
        this.prodPlanTypeName = prodPlanTypeName
        this.versionWiseData = versionWiseData
    };
}