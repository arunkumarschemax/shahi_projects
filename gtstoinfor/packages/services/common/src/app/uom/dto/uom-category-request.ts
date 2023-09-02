
import { ApiProperty } from "@nestjs/swagger";
import { CommonRequestAttrs, UomCategoryEnum } from "@project-management-system/shared-models";


// WARNING: THIS CLASS SHOULD EXACTLY BE THE SAME AS IN THE MODELS FOLDER OF THE BACKEND.

export class UomCategoryRequest extends CommonRequestAttrs {
    @ApiProperty()
    uomCategory: UomCategoryEnum;
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    isActive?: boolean;
  

    constructor(username: string,  uomCategory: UomCategoryEnum, versionFlag?: number,isActive?: boolean) {
        super(username);
        this.uomCategory = uomCategory;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
    }
}
