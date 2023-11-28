import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    @ApiProperty()
    poTrimId:number


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
    indentTrimId:number

    @ApiProperty()
    sampleReqTrimId:number

    @ApiProperty()
    poQuantity:number

    @ApiProperty()
    quantityUomId:number

    @ApiProperty()
    grnQuantity:number



}