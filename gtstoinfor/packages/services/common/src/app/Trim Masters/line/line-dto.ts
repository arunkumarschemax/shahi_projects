import { ApiProperty } from "@nestjs/swagger";

export class LineDto{
    @ApiProperty()
    lineId: number

    @ApiProperty()
    line: string

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