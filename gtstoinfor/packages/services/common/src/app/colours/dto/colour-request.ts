import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class ColourRequest {
    @ApiProperty()
    @IsNotEmpty()
    colourId:number;

    @ApiProperty()
    colour: string;

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