import { ApiProperty } from "@nestjs/swagger";

export class TrimSizeDto{
    @ApiProperty()
    trimSizeId: number

    @ApiProperty()
    trimSize: string

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