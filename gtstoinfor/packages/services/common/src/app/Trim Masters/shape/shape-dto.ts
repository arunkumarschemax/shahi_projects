import { ApiProperty } from "@nestjs/swagger";

export class ShapeDto{
    @ApiProperty()
    shapeId: number

    @ApiProperty()
    shape: string

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