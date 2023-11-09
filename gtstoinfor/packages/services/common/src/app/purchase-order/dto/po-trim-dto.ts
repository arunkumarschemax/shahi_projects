import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{

    @ApiProperty()
    poTrimId:number

    @ApiProperty()
    productGroupId:number

    @ApiProperty()
    trimId:number

    @ApiProperty()
    trimCode:number


    @ApiProperty()
    description: string

    @ApiProperty()
    consumption: number

    @ApiProperty()
    remarks: string
}