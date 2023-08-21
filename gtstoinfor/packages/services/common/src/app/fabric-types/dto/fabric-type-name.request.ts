import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FabricTypeItemNameRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    fabricTypeName: string;

    @ApiProperty()
    isActive?: boolean;
}