import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupTechClassDto {
    @ApiProperty()
    groupTechClassId: number;

    @ApiProperty()
    groupTechClassCode: string;

    @ApiProperty()
    groupTechClassDescription: string;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    divisionId: number;

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
}

