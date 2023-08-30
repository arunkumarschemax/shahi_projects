import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountControlObjectRequest {
    @ApiProperty()
   
    accountControlObjectsId: number;

    @ApiProperty()
    updatedUser?: string;

    @ApiProperty()
    versionFlag?: number;

    @ApiProperty()
    isActive?: boolean;
}