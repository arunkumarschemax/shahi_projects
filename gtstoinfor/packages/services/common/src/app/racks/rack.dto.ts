import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RacksDTO {

    @ApiProperty()
    rackId: number;

    @ApiProperty()
    rackName: string;

    @ApiProperty()
    rackCode: number;

    @ApiProperty()
    unit: string;

    @ApiProperty()
    rackType: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

