import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class FabricsRequest {
    @ApiProperty()
    @IsNotEmpty()
    fabricsId:number;

    @ApiProperty()
    fabricsName: string;

    @ApiProperty()
    fabricsCode: string;

    @ApiProperty()
    description: string;

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