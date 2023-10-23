import { ApiProperty } from "@nestjs/swagger";
import { ItemGroupEnum } from "@project-management-system/shared-models";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class ItemGroupRequest {
    @ApiProperty()
    @IsNotEmpty()
    itemGroupId:number;
    
    // @ApiProperty()
    // itemGroup: ItemGroupEnum;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    isActive: boolean;  

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
     @IsNumber()
    versionFlag: number;

}