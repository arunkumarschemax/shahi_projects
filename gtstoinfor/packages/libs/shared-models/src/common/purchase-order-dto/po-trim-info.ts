import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    poTrimId:number
    productGroupId:number
    trimId:number
    trimCode:number
    description: string
    consumption: number
    remarks: string
}