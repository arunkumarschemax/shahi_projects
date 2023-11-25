import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RackPositionStatusEnum } from '@project-management-system/shared-models';
export class RackPositionDTO {

    @ApiProperty()
    positionId: number;

    @ApiProperty()
    rackPositionName: string;

    @ApiProperty()
    ColumnId: number;
    Column:string;

    @ApiProperty()
    levelId: number;
    levelName:string;

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

