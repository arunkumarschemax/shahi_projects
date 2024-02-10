import {  IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationsRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    locationId: number;
}