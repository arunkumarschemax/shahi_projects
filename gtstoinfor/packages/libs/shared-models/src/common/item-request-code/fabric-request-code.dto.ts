import { MaterialFabricEnum } from "../../enum"

export class FabricRequestCodeDto {
    buyerId : number
    fabricTypeId: number
    weaveId: number
    weight: number
    weightUnit: number
    epiConstruction: string
    ppiConstruction: string
    yarnType: string
    width: number
    widthUnit: number
    finishId: number
    contentId: number
    shrinkage: string
    m3Code: string
    hsnCode: string
    status: MaterialFabricEnum
    isActive?: boolean
    createdUser?: string
    updatedUser?: string
    versionFlag?: number
    fabricRequestCodeId?: number

    constructor(
        buyerId:number,
        fabricTypeId: number,
        weaveId: number,
        weight: number,
        weightUnit: number,
        epiConstruction: string,
        ppiConstruction: string,
        yarnType: string,
        width: number,
        widthUnit: number,
        finishId: number,
        contentId: number,
        shrinkage: string,
        m3Code: string,
        hsnCode: string,
        status?: MaterialFabricEnum,
        isActive?: boolean,
        createdUser?: string,
        updatedUser?: string,
        versionFlag?: number,
        fabricRequestCodeId?: number
    ){
        this.buyerId = buyerId
        this.fabricRequestCodeId = fabricRequestCodeId
        this.fabricTypeId = fabricTypeId
        this.weaveId = weaveId
        this.weight = weight
        this.weightUnit = weightUnit
        this.epiConstruction = epiConstruction
        this.ppiConstruction = ppiConstruction
        this.yarnType = yarnType
        this.width = width
        this.widthUnit = widthUnit
        this.finishId = finishId
        this.contentId = contentId
        this.shrinkage = shrinkage
        this.m3Code = m3Code
        this.hsnCode = hsnCode
        this.status = status
        this.isActive = isActive
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}

