import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ThreadRequest {
    @ApiProperty()
    @IsNotEmpty()
    threadId: number;

    @ApiProperty()
    @IsOptional()
    updatedUser: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    versionFlag: number;

    @ApiProperty()
    isActive: boolean;
}