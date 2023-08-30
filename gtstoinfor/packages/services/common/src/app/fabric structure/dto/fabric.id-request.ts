import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FabricStructureIdRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    fabricStructureId: number;
}