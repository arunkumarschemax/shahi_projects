import { ApiProperty } from "@nestjs/swagger";

export class LengthDto{
    @ApiProperty()
    lengthId: number

    @ApiProperty()
    length: string

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