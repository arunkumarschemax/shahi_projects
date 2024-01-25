import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaterialFabricEnum, m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';

export class FabricRequestCodeDto {

    @ApiProperty()
    fabricRequestCodeId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    fabricTypeId: number;

    @ApiProperty()
    weaveId: number;

    @ApiProperty()
    weight: number;

    @ApiProperty()
    weightUnit: number;

    @ApiProperty()
    epiConstruction: string;

    @ApiProperty()
    ppiConstruction: string;

    @ApiProperty()
    yarnType: string;

    @ApiProperty()
    width: number;

    @ApiProperty()
    widthUnit: number;

    @ApiProperty()
    finishId: number;

    @ApiProperty()
    contentId: number;

    @ApiProperty()
    shrinkage: string;
    
    @ApiProperty()
    m3Code: string;
        
    @ApiProperty()
    hsnCode: string;
        
    @ApiProperty()
    status: MaterialFabricEnum

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;
}

