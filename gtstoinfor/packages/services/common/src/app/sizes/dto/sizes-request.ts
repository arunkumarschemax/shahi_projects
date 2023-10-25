import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class SizeRequest {
    @ApiProperty()
    @IsNotEmpty()
    sizeId:number;
    
    @ApiProperty()
    sizeCode: string;

    @ApiProperty()
    size: string;

    @ApiProperty()
    decsription: string;

    @ApiProperty()
    optionGroup: string;

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