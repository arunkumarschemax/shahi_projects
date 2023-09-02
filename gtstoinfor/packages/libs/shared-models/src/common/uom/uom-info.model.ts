
import { UomCategoryEnum } from "../../enum/uom-category-enum";

export class UomInfoModel {
    uomId: number;
    uom: string;
    uomCategory: UomCategoryEnum;
    description: string;
    username: string;

    constructor(uomId: number,uom: string, uomCategory: UomCategoryEnum, description: string,username: string){
        this.uomId = uomId;
        this.uom = uom;
        this.uomCategory = uomCategory;
        this.description = description;
        this.username = username;
    }
}