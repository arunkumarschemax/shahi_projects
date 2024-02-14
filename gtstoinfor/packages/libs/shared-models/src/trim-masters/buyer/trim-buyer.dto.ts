export class TrimBuyerDto{
    trimBuyerId: number
    trimBuyer: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        trimBuyerId: number,
        trimBuyer: string,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.trimBuyerId = trimBuyerId
        this.trimBuyer = trimBuyer
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}