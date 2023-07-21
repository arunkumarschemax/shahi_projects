import { VersionAndQtyModel } from "./version-qty-model";

export class VersionDataModel {
    productionPlanId: number;
    itemCode:string;
    itemName:string
    versionWiseData: VersionAndQtyModel[];
    constructor(productionPlanId: number, itemCode:string, itemName:string, versionWiseData:VersionAndQtyModel[]){
        this.itemCode = itemCode
        this.itemName = itemName
        this.productionPlanId = productionPlanId
        this.versionWiseData = versionWiseData
    };
}