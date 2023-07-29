import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemCategoryNameRequest {
    itemCategory: string;
    isActive?: boolean;
    constructor(itemCategory: string,isActive?: boolean){
        this.itemCategory = itemCategory;
        this.isActive = isActive;

    }
}