import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CoBomDto{
    @ApiProperty()
    fgItemBomId:number;

    @ApiProperty()
    quantity:string;


    @ApiProperty()
    coNumber:string;


    @ApiProperty()
    coLineNumber:string


    @ApiProperty()
    fgSku:string


    @ApiProperty()
    orderId:number

    @ApiProperty()
    isActive: boolean;
    
    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
     @IsNumber()
    versionFlag: number;

}