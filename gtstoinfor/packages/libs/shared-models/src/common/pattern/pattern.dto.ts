import { FactoryDto } from "@project-management-system/shared-models"

export class PatternDto{
    patternId: number
    patternName: string
    email: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number
    factoryLocationId: number

    constructor(
        patternName: string,
        email: string,
        factoryLocationId: number,
        isActive?: boolean,
        createdAt?: Date,
        createdUser?: string,
        updatedAt?: Date,
        updatedUser?: string,
        versionFlag?: number,
        patternId?: number,
    ){
        this.patternId = patternId
        this.patternName = patternName
        this.email = email
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.factoryLocationId = factoryLocationId
    }
}