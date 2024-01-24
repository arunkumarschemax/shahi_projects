import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTypeEnum, LogoEnum, PartEnum } from '@project-management-system/shared-models';
import { ItemType } from 'rc-menu/lib/interface';
export class TrimRequestCodeDto {
    trimType: ItemTypeEnum;
    // logo: LogoEnum;
    // part: PartEnum;
    trimCategoryId:number
    buyerId:number
    // varietyId:number
    // uomId:number
    typeId:number
    // thicknessId:number
    // structureId:number
    // qualityId:number
    holeId:number
    finishId:number
    contentId:number
    categoryId:number
    // colorId:number
    m3Code?: string
    hsnCode?: string
    isActive: boolean
    createdUser: string
    updatedUser: string
    versionFlag: number

    constructor(
        trimType: ItemTypeEnum,
        // logo: LogoEnum,
        // part: PartEnum,
        trimCategoryId:number,
        buyerId:number,
        // varietyId:number,
        // uomId:number,
        typeId:number,
        // thicknessId:number,
        // structureId:number,
        // qualityId:number,
        holeId:number,
        finishId:number,
        contentId:number,
        categoryId:number,
        // colorId:number,
        m3Code: string,
        hsnCode: string,
        isActive?: boolean,
        createdUser?: string,
        updatedUser?: string,
        versionFlag?: number
    ){
        this.trimType = trimType
        this.trimCategoryId  = trimCategoryId
        this.buyerId = buyerId
        this.typeId = typeId
        this.holeId = holeId
        this.finishId = finishId
        this.contentId = contentId
        this.categoryId = categoryId
        this.m3Code = m3Code
        this.hsnCode = hsnCode
        this.isActive = isActive
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}

