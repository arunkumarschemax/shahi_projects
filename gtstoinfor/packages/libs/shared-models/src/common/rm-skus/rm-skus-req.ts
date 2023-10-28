import { RmItemTypeEnum, RmStatusEnum } from "../../enum";
import { RmSkuFeatureReq } from "./rm-sku-feture.req";

export class RmSkuReq {
    rmItemId: number;
    itemType: RmItemTypeEnum;
    features: RmSkuFeatureReq[];
    status: RmStatusEnum;
    itemCode: string;
    createdUser: string;
    

    constructor(rmItemId: number,itemType: RmItemTypeEnum,features: RmSkuFeatureReq[],status: RmStatusEnum,itemCode: string,createdUser: string,){
        this.rmItemId = rmItemId
        this.itemType = itemType
        this.features = features
        this.status = status
        this.itemCode = itemCode
        this.createdUser = createdUser
    }

}