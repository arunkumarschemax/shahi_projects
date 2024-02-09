export class LengthDto{
    lengthId: number
    length: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        lengthId: number,
        length: string,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.lengthId = lengthId
        this.length = length
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}