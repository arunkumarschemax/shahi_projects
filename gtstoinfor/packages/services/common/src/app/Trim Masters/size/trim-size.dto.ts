import { ApiProperty } from "@nestjs/swagger";
import { TrimSizeTypeEnum } from "@project-management-system/shared-models";

export class TrimSizeDto{
    @ApiProperty()
    trimSizeId: number

    @ApiProperty()
    trimSize: string

    @ApiProperty()
    type: TrimSizeTypeEnum

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