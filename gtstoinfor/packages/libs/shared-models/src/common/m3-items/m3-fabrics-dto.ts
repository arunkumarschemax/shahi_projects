import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { m3ItemsContentEnum } from 'packages/libs/shared-models/src/enum';
import { FabricYarnDto } from './fabric-yarn-dto';
import { FabricContentDto } from './fabric-content-dto';

export class M3FabricsDTO {

    m3ItemsId: number;
    buyerId: number;
    itemCode: string;
    fabricTypeId: number;
    weaveId: number;
    weightId: number;
    weightUnit: number;
    epiConstruction: any;
    ppiConstruction: any;
    yarnType: any;
    width: any;
    widthUnit: any;
    finishId: number
    shrinkage: string;
    description: string
    buyerCode?: string;
    m3Code?: string;
    hsnCode?: string;
    fabricYarnInfo?: any[]
    fabricContentInfo: any[]
    isActive?: boolean
    createdUser?: string
    updatedUser?: string
    versionFlag?: number

    constructor(
        m3ItemsId: number,
        buyerId: number,
        itemCode: string,
        fabricTypeId: number,
        weaveId: number,
        weightId: number,
        weightUnit: number,
        epiConstruction: any,
        ppiConstruction: any,
        yarnType: any,
        width: any,
        widthUnit: any,
        finishId: number,
        shrinkage: string,
        description: string,
        buyerCode?: string,
        m3Code?: string,
        hsnCode?: string,
        fabricYarnInfo?: any[],
        fabricContentInfo?: any[],
        isActive?: boolean,
        createdUser?: string,
        updatedUser?: string,
        versionFlag?: number,
    ){
        this.m3ItemsId = m3ItemsId
        this.buyerId = buyerId
        this.itemCode = itemCode
        this.fabricTypeId = fabricTypeId
        this.weaveId = weaveId
        this.weightId = weightId
        this.weightUnit = weightUnit
        this.epiConstruction = epiConstruction
        this.ppiConstruction = ppiConstruction
        this.yarnType = yarnType
        this.width = width
        this.widthUnit = widthUnit
        this.finishId = finishId
        this.shrinkage = shrinkage
        this.description = description
        this.isActive = isActive
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.buyerCode = buyerCode
        this.m3Code = m3Code
        this.hsnCode = hsnCode
        this.fabricYarnInfo = fabricYarnInfo
        this.fabricContentInfo = fabricContentInfo
    }
}

