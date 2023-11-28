import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LevelsRequest {
    @ApiProperty()
    @IsNotEmpty()
    levelId: number;

    @ApiProperty()
    levelName: string;

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