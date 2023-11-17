import { ApiProperty } from "@nestjs/swagger"

export class SampleInventoryLog {
    @ApiProperty()
    addressInfo: { size: number; quantity: number; location: number }[]
    operationInventoryId : number
 }

