import { ApiProperty } from "@nestjs/swagger";

export class TrimBuyerDto{
    @ApiProperty()
    trimBuyerId: number

    @ApiProperty()
    trimBuyer: string

    @ApiProperty()
    isActive: boolean

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    createdUser: string

    @ApiProperty()
    updatedAt: Date

    @ApiProperty()
    updatedUser: string

    @ApiProperty()
    versionFlag: number
}