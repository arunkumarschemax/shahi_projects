import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyersDestinationRequest {
    @ApiProperty()
    @IsNotEmpty()
    BsId: number;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    versionFlag: number;
     
    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    destinationId:number;

    @ApiProperty()
    sizeId:number;

    @ApiProperty()
    updateId:number;
    
@ApiProperty()
buyerId:number;

}