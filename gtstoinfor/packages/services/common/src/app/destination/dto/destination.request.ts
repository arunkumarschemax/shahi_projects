import { IsNotEmpty, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DestinationRequest {
    @ApiProperty()
    @IsNotEmpty()
    destinationId: number;
    @ApiProperty()
    @IsNotEmpty()
    destination: string;
    @ApiProperty()
    @IsNotEmpty()
    destinationCode: string;
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    @ApiProperty()
    @IsNotEmpty()
    optionGroup: string;
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