import { LengthDto } from "@project-management-system/shared-models"
import { VendorsDto } from "../../common"

export class ArticleDto{
    articleId:number
    articleName: string
    text: string
    createdAt:Date
    createdUser: string
    updatedAt: Date
    updatedUser: string
    supplierId: number
    lengthId: number
    isActive: boolean
    vendorInfo: VendorsDto[]
    lengthInfo: LengthDto[]

    constructor(
        articleId:number,
        articleName: string,
        text: string,
        createdAt:Date,
        createdUser: string,
        updatedAt: Date,
        updatedUser: string,
        supplierId: number,
        lengthId: number,
        isActive: boolean,
        vendorInfo: VendorsDto[],
        lengthInfo: LengthDto[]
            
    ){
        this.articleId = articleId
        this.articleName = articleName
        this.text = text
        this.createdAt = createdAt
        this.createdUser = createdUser
        this.updatedAt = updatedAt
        this.updatedUser = updatedUser
        this.supplierId = supplierId
        this.lengthId = lengthId
        this.isActive = isActive
        this.vendorInfo = vendorInfo
        this.lengthInfo = lengthInfo
    }

}