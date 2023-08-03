import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttributeAgainstEnum } from '@project-management-system/shared-models';
export class AttributeDto {

    @ApiProperty()
    attributeId?: number;

    @ApiProperty()
    attributeName: string;

    @ApiProperty()
    isActive: boolean;
    createdAt : Date;

    @ApiProperty()
    createdUser : string;
    updatedAt : Date;

    @ApiProperty()
    updatedUser : string;

    @ApiProperty()
    versionFlag : number;

    @ApiProperty()
    attributeAgainst : AttributeAgainstEnum
}

