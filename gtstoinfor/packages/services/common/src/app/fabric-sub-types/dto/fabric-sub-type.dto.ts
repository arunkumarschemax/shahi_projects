import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FabricSubTypeDto{
    @ApiProperty()
    fabricSubTypeId: number;

    @ApiProperty()
    fabricSubTypeName: string;

    @ApiProperty()
    fabricTypeId: number;
    fabricTypeName: string;

    @ApiProperty()
    isActive: boolean;
    
    createdAt : Date;
    createdUser : string;

    updatedAt : Date;
    @ApiProperty()
    updatedUser : string;

    @ApiProperty()
    versionFlag : number;
}