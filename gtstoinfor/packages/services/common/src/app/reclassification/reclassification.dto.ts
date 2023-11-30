import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RackEnum, ReclassificationStatusEnum } from '@project-management-system/shared-models';
export class ReclassificationDTO {

    @ApiProperty()
    reclassificationId: number;

    @ApiProperty()
    stockId: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    itemId: number;

    @ApiProperty()
    location: number;

    @ApiProperty()
    buyer: number;

    @ApiProperty()
    fromBuyer:number;

    @ApiProperty()
    status: ReclassificationStatusEnum;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    grnItemId?: number;

    @ApiProperty()
    uomId?: number;
}

