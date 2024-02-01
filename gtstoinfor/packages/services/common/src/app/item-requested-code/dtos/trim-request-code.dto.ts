import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTypeEnum, LogoEnum, PartEnum } from '@project-management-system/shared-models';
import { ItemType } from 'rc-menu/lib/interface';
export class TrimRequestCodeDto {

    @ApiProperty()
    trimType: ItemTypeEnum;

    @ApiProperty()
    logo: LogoEnum;

    @ApiProperty()
    part: PartEnum;

    @ApiProperty()
    trimCategoryId:number

    @ApiProperty()
    buyerId:number

    @ApiProperty()
    trimId:number

    @ApiProperty()
    trimMappingId:number

    @ApiProperty()
    varietyId:number

    @ApiProperty()
    uomId:number

    @ApiProperty()
    typeId:number

    @ApiProperty()
    thicknessId:number

    @ApiProperty()
    structureId:number

    @ApiProperty()
    qualityId:number

    @ApiProperty()
    holeId:number

    @ApiProperty()
    finishId:number

    @ApiProperty()
    contentId:number

    @ApiProperty()
    categoryId:number

    @ApiProperty()
    colorId:number
    
    @ApiProperty()
    m3Code?: string;

    @ApiProperty()
    hsnCode?: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    m3TrimId: number;

}

