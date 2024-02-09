import { ApiProperty } from "@nestjs/swagger";

export class PlyDto{
    @ApiProperty()
    plyId: number

    @ApiProperty()
    ply: string

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