import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemCategoryNameRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    itemCategory: string;

    @ApiProperty()
    isActive?: boolean;
}