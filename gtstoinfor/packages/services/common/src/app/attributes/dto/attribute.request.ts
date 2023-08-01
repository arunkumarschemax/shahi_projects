import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttributeRequest {
    @ApiProperty()
    // @IsNotEmpty()
    // @IsAlphanumeric()
    attributeId: number;

    @ApiProperty()
    updatedUser?: string;

    @ApiProperty()
    versionFlag?: number;

    @ApiProperty()
    isActive?: boolean;
}