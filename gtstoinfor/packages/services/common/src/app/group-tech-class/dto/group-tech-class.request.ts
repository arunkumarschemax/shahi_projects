import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupTechClassRequest {
    @ApiProperty()
    groupTechClassId: number;

    @ApiProperty()
    isActive?: boolean;

    @ApiProperty()
    createdUser?: string;

    updatedAt? : Date;

    @ApiProperty()

    updatedUser?: string;

    @ApiProperty()
    versionFlag?: number;
}