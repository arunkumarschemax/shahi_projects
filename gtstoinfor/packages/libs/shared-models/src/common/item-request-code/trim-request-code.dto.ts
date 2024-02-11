import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTypeEnum, LogoEnum, PartEnum } from '@project-management-system/shared-models';
import { ItemType } from 'rc-menu/lib/interface';
export class TrimRequestCodeDto {
    trimType: ItemTypeEnum;
    logo: LogoEnum;
    part: PartEnum;
    trimCategoryId:number
    buyerId:number
    varietyId:number
    uomId:number
    typeId:number
    thicknessId:number
    structureId:number
    qualityId:number
    holeId:number
    finishId:number
    contentId:number
    categoryId:number
    colorId:number
    m3Code?: string
    hsnCode?: string
    isActive: boolean
    createdUser: string
    updatedUser: string
    versionFlag: number
    trimBuyerId?: number
    lengthId?: number
    lineId?: number
    partsId?: number
    plyId?: number
    shapeId?: number
    sliderId?: number
    trimSizeId?: number

    constructor(
        trimType: ItemTypeEnum,
        part: PartEnum,
        logo: LogoEnum,
        trimCategoryId:number,
        buyerId:number,
        varietyId:number,
        uomId:number,
        typeId:number,
        thicknessId:number,
        structureId:number,
        qualityId:number,
        holeId:number,
        finishId:number,
        contentId:number,
        categoryId:number,
        colorId:number,
        m3Code: string,
        hsnCode: string,
        isActive?: boolean,
        createdUser?: string,
        updatedUser?: string,
        versionFlag?: number,
        trimBuyerId?: number,
        lengthId?: number,
        lineId?: number,
        partsId?: number,
        plyId?: number,
        shapeId?: number,
        sliderId?: number,
        trimSizeId?: number
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
        this.logo = logo
        this.part = part
        this.varietyId = varietyId
        this.colorId = colorId
        this.structureId = structureId
        this.uomId = uomId
        this.thicknessId = thicknessId
        this.qualityId = qualityId
        this.trimBuyerId = trimBuyerId
        this.lengthId = lengthId
        this.lineId = lineId
        this.partsId = partsId
        this.plyId = plyId
        this.shapeId = shapeId
        this.sliderId = sliderId
        this.trimSizeId = trimSizeId
    }
}

