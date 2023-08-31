import { CommonRequestAttrs } from "../../common";
import { UomCategoryEnum } from "../../enum/uom-category-enum";


export class UomCategoryRequest extends CommonRequestAttrs {
    uomCategory: UomCategoryEnum;
    versionFlag?: number;
    isActive?: boolean;
    constructor(uomCategory: UomCategoryEnum, username: string,versionFlag?: number, isActive?: boolean) {
        super(username)
        this.uomCategory = uomCategory;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
    }
}