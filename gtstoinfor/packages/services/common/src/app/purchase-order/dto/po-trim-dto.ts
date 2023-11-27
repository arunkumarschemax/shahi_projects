import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    @ApiProperty()
    poTrimId:number

    @ApiProperty()
    productGroupId:number

    @ApiProperty()
    trimId:number

    @ApiProperty()
    colourId:number

    @ApiProperty()
    description: string

    @ApiProperty()
    consumption: number 

    @ApiProperty()
    remarks: string
    
    @ApiProperty()
    m3TrimCode: string

    @ApiProperty()
    poAgainstId:number

    @ApiProperty()
    poQuantity:number

    @ApiProperty()
    quantityUomId:number

    @ApiProperty()
    grnQuantity:number



}