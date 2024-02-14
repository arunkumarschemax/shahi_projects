import { ApiProperty } from "@nestjs/swagger";
import { FactoryDto } from "../factories/dto/factory.dto";

export class PatternDto{
    @ApiProperty()
    patternId: number

    @ApiProperty()
    patternName: string

    @ApiProperty()
    email: string

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

    @ApiProperty()
    factoryLocationId: number
}