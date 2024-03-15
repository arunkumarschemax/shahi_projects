import { TrimSizeTypeEnum } from "../../enum"

export class TrimSizeDto{
    trimSizeId: number
    trimSize: string
    type: TrimSizeTypeEnum
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        trimSizeId: number,
        trimSize: string,
        type: TrimSizeTypeEnum,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.trimSizeId = trimSizeId
        this.trimSize = trimSize
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
        this.type = type
    }
}