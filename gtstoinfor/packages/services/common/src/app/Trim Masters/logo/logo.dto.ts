import { ApiProperty } from "@nestjs/swagger";

export class LogoDto{
    @ApiProperty()
    logoId: number

    @ApiProperty()
    logo: string

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