import { CommonRequestAttrs } from "../../common";
import { UomCategoryEnum } from "../../enum/uom-category-enum";

export class UomRequest extends CommonRequestAttrs {
    uomId: number;
    uom: string;
    uomCategory: UomCategoryEnum;
    description: string;

    constructor(uomId: number,uom: string,uomCategory:UomCategoryEnum,description: string,username: string) {
        super(username);
        this.uomId = uomId;
        this.uom = uom;
        this.uomCategory = uomCategory
        this.description = description;
    }
}