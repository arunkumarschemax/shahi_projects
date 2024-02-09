export class PartsDto{
    partsId: number
    parts: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        partsId: number,
        parts: string,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.partsId = partsId
        this.parts = parts
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}