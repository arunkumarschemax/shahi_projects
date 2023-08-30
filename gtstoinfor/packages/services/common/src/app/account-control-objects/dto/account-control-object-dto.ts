import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountControlObjectDto{
    @ApiProperty()
    accountControlObjectsId: number;

    @ApiProperty()
    accountControlObjectsName: string;

    @ApiProperty()
    profitControlHeadId: number;
    profitControlHead: string;

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