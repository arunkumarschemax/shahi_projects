import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttributeAgainstEnum } from '@project-management-system/shared-models';

export class AttributeAgainstRequest {
    @ApiProperty()
    attributeAgainst?: AttributeAgainstEnum;

    @ApiProperty()
    isActive: boolean;
}