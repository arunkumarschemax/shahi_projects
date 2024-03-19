import { ApiProperty } from "@nestjs/swagger";
import { VendorsDTO } from "../../vendors/dto/vendors.dto";
import { LengthDto } from "../length/length-dto";

export class ArticleDto{
    @ApiProperty()
    articleId:number
    @ApiProperty()
    articleName: string
    @ApiProperty()
    text: string
    @ApiProperty()
    createdAt:Date
    @ApiProperty()
    createdUser: string
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    updatedUser: string
    @ApiProperty()
    supplierId: number
    @ApiProperty()
    lengthId: number
    @ApiProperty()
    isActive: boolean
    @ApiProperty()
    vendorInfo: VendorsDTO[]
    @ApiProperty()
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
        vendorInfo: VendorsDTO[],
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