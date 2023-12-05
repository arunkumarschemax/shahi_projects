import { ApiProperty } from "@nestjs/swagger";
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