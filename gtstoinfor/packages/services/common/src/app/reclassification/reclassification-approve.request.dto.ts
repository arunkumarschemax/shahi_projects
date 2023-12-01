import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RackEnum, ReclassificationStatusEnum } from '@project-management-system/shared-models';
export class ReclassificationApproveRequestDTO {

    @ApiProperty()
    reclassificationId: number;

    @ApiProperty()
    stockId: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    itemId: number;
    @ApiProperty()
    itemType: string;

    @ApiProperty()
    location: number;

    @ApiProperty()
    styleId: number;

    @ApiProperty()
    buyer: number;

    @ApiProperty()
    fromBuyer:number;

    @ApiProperty()
    status: ReclassificationStatusEnum;

    @ApiProperty()
    grnItemId?: number;

    @ApiProperty()
    uomId?: number;
}

