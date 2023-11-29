import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RackPositionStatusEnum } from '@project-management-system/shared-models';
export class RackPositionDTO {

    @ApiProperty()
    positionId: number;

    @ApiProperty()
    rackPositionName: string;

    @ApiProperty()
    columnId: number;

    @ApiProperty()
    levelId: number;

    @ApiProperty()
    positionCode: number;

    @ApiProperty()
    rackName: string;

    @ApiProperty()
    status: RackPositionStatusEnum;


    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

