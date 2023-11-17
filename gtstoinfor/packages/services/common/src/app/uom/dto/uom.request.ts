import { ApiProperty } from "@nestjs/swagger";
import { CommonRequestAttrs, UomCategoryEnum } from "@project-management-system/shared-models";

export class UomRequest extends CommonRequestAttrs {

    @ApiProperty()
    uomId: number;
    @ApiProperty()
    uom: string;
    @ApiProperty()
    uomCategory: UomCategoryEnum;
    @ApiProperty()
    description: string;
    @ApiProperty()
    units: string;

    constructor(uomId: number, uom: string, uomCategory: UomCategoryEnum, description: string, username: string,units:string) {
        super(username);
        this.uomId = uomId;
        this.uom = uom;
        this.uomCategory = uomCategory;
        this.description = description;
        this.units = units
    }
}