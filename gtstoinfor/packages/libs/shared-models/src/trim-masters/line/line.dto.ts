export class LineDto{
    lineId: number
    line: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        lineId: number,
        line: string,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.lineId = lineId
        this.line = line
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}