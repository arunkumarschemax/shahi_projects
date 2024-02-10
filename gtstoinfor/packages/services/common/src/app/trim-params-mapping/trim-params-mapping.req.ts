import { ApiProperty } from "@nestjs/swagger";
import { ItemTypeEnum } from "@project-management-system/shared-models";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class TrimParamsMappingRequest {
    @ApiProperty()
    @IsNotEmpty()
    trimParamsMapping: number;
    @ApiProperty()
    category:boolean
    @ApiProperty()
    trimId:number;
    @ApiProperty()
    color:boolean
    @ApiProperty()
    content:boolean
    @ApiProperty()
    finish:boolean
    @ApiProperty()
    hole:boolean
    @ApiProperty()
    logo:boolean
    @ApiProperty()
    part:boolean
    @ApiProperty()
    quality:boolean
    @ApiProperty()
    structure:boolean
    @ApiProperty()
    thickness:boolean
    @ApiProperty()
    type:boolean
    @ApiProperty()
    uom:boolean
    @ApiProperty()
    variety:boolean
    @ApiProperty()
    ply:boolean
    @ApiProperty()
    length:boolean
    @ApiProperty()
    line:boolean
    @ApiProperty()
    parts:boolean
    @ApiProperty()
    buyer:boolean
    @ApiProperty()
    shape:boolean
    @ApiProperty()
    slider:boolean
    @ApiProperty()
    trimType:ItemTypeEnum
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
    @ApiProperty()
    size:boolean

}