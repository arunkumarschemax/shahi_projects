import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';

export class M3ItemsDTO {

    @ApiProperty()
    m3ItemsId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    itemCode: string;

    @ApiProperty()
    content: m3ItemsContentEnum;

    @ApiProperty()
    fabricType: number;

    @ApiProperty()
    weave: number;

    @ApiProperty()
    weight: number;

    @ApiProperty()
    weightUnit: string;

    @ApiProperty()
    construction: string;

    @ApiProperty()
    yarnCount: string;

    @ApiProperty()
    yarnUnit: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    widthUnit: string;

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

