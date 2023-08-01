import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GarmentCategoryNameRequest {
    GarmentCategory: string;
    isActive?: boolean;
    constructor(GarmentCategory: string,isActive?: boolean){
        this.GarmentCategory = GarmentCategory;
        this.isActive = isActive;

    }
}