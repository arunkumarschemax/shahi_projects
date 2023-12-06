import { ApiProperty } from "@nestjs/swagger"

export class IndentItemsDto {
    @ApiProperty()
    indentItemId: number
    @ApiProperty()
    rmItemCode: string
    @ApiProperty()
    rmItemId: number
    @ApiProperty()
    quantity: number 
    @ApiProperty()
    quantityUnit: number
    @ApiProperty()
    remarks: string
    @ApiProperty()
    isActive: boolean
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    createdUser: string | null
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    updatedUser: string | null
    @ApiProperty()
    versionFlag?: number
    @ApiProperty()
    recivedQuantity?: number

    constructor(
        indentItemId: number,rmItemCode: string,rmItemId: number,quantity: number,
        quantityUnit: number,remarks: string,isActive: boolean,createdAt: Date,createdUser: string | null,updatedAt: Date,updatedUser: string | null,versionFlag?: number,recivedQuantity?: number){
            
            this.indentItemId = indentItemId
            this.rmItemCode = rmItemCode
            this.rmItemId = rmItemId
            this.quantity = quantity
            this.quantityUnit = quantityUnit
            this.remarks = remarks
            this.isActive = isActive
            this.createdAt = createdAt
            this.createdUser = createdUser
            this.updatedAt = updatedAt
            this.updatedUser = updatedUser
            this.versionFlag = versionFlag
            this.recivedQuantity = recivedQuantity
    }

}
