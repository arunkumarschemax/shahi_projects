import { ApiProperty } from "@nestjs/swagger";

export class ComponentMappingFilterReq{
    @ApiProperty()
    styleId : number;

    @ApiProperty()
    garmentCategoryId: number;

    @ApiProperty()
    garmentId: number;
}