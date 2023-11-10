import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    poTrimId:number
    productGroupId:number
    trimId:number
    colourId:number
    m3TrimCode:string
    description: string
    consumption: number
    remarks: string

}