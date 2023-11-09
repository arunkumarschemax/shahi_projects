import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class ProfitControlHeadRequest {
    @ApiProperty()
    @IsNotEmpty()
    profitControlHeadId:number;

    @ApiProperty()
    profitControlHead: string;

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