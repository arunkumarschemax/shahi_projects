import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTypeEnum, RackPositionStatusEnum } from '@project-management-system/shared-models';
export class RackPositionDTO {

    @ApiProperty()
    positionId: number;

    @ApiProperty()
    rackPositionName: string;

    @ApiProperty()
    positionCode: number;

    @ApiProperty()
    barcodeId: string;

    @ApiProperty()
    level:number

    @ApiProperty()
    column:number

    @ApiProperty()
    rackId:number
    @ApiProperty()
    supportedPalletsCount:number

    @ApiProperty()
    prefferedStorageMaterial: ItemTypeEnum;

    @ApiProperty()
    remarks: string;

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

