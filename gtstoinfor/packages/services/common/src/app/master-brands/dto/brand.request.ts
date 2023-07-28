import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BrandRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    brandId: number;
}