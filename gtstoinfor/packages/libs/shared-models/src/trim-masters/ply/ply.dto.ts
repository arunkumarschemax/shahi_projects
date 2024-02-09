export class PlyDto{
    plyId: number
    ply: string
    isActive: boolean
    createdAt: Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    versionFlag: number

    constructor(
        plyId: number,
        ply: string,
        isActive: boolean,
        createdAt: Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        versionFlag: number 
    ){
        this.plyId = plyId
        this.ply = ply
        this.isActive = isActive
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.versionFlag = versionFlag
    }
}