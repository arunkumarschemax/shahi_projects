import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class M3ItemsDTO {

    @ApiProperty()
    itemCode: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    fabricType: string;

    @ApiProperty()
    weave: string;

    @ApiProperty()
    weight: number;

    @ApiProperty()
    construction: string;

    @ApiProperty()
    yarnCount: string;

    @ApiProperty()
    finish: string;

    @ApiProperty()
    shrinkage: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

