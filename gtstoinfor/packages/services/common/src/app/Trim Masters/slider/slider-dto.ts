import { ApiProperty } from "@nestjs/swagger";

export class SliderDto{
    @ApiProperty()
    sliderId: number

    @ApiProperty()
    slider: string

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