import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTypeEnum, LogoEnum, PartEnum, m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';

export class M3TrimItemsDTO {

    @ApiProperty()
    m3ItemsId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    itemCode: string;


    @ApiProperty()
    description: string;

    @ApiProperty()
    itemType: ItemTypeEnum;

    @ApiProperty()
    colorId: number;


    @ApiProperty()
    trimId: number;

    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    contentId: number;

    @ApiProperty()
    finishId: number;

    @ApiProperty()
    holeId: number;

    @ApiProperty()
    logo: LogoEnum;

    @ApiProperty()
    part: PartEnum;

    @ApiProperty()
    qualityId: number;

    @ApiProperty()
    structureId: number;

    @ApiProperty()
    thicknessId: number;

    @ApiProperty()
    typeId: number;

    @ApiProperty()
    uomId: number;

    @ApiProperty()
    varietyId: number;
    
    @ApiProperty()
    trimCategoryId: number;

    @ApiProperty()
    trimMappingId: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    buyerCode?: string;


}

