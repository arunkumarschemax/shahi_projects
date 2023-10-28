import { RmItemTypeEnum, RmStatusEnum } from "../../enum";
import { RmSkuFeatureModel } from "./rm-sku-feture-model";

export class RmSkuModel{
    rmItemId: number;
    itemType: RmItemTypeEnum;
    features: RmSkuFeatureModel[];
    status: RmStatusEnum;
    itemCode: string;
   

    constructor(rmItemId: number,itemType: RmItemTypeEnum,features: RmSkuFeatureModel[],status: RmStatusEnum,itemCode: string){
        this.rmItemId = rmItemId
        this.itemType = itemType
        this.features = features
        this.status = status
        this.itemCode = itemCode
        
    }

}