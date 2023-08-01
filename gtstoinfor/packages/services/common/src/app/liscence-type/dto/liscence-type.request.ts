import {  IsNotEmpty,  IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LiscenceTypeRequest {
    @ApiProperty()
    @IsNotEmpty()
    liscenceTypeId: number;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    versionFlag: number;

    @ApiProperty()
    isActive: boolean;
}