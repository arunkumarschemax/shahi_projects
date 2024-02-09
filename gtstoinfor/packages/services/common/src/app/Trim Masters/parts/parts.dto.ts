import { ApiProperty } from "@nestjs/swagger";

export class PartsDto{
    @ApiProperty()
    partsId: number

    @ApiProperty()
    parts: string

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