import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GarmentCategoryNameRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    garmentCategory: string;

    @ApiProperty()
    isActive?: boolean;
}