import { RmItemTypeEnum, RmStatusEnum } from "../../enum";
import { RmSkuFeatureReq } from "./rm-sku-feture.req";

export class RMSkuFilterReq {
    skuCode?: string;
    featureCode?: string;
    itemCode?: string;
    optionValue?: string;
    

    constructor(skuCode?: string,featureCode?: string,itemCode?: string,optionValue?: string,){
        this.skuCode = skuCode
        this.featureCode = featureCode
        this.itemCode = itemCode
        this.optionValue = optionValue
    }

}