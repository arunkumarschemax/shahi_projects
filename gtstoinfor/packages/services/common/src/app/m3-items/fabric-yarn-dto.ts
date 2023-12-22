import { ApiProperty } from '@nestjs/swagger';

export class FabricYarnDto {

    @ApiProperty()
    fabricYarnId: number;

    @ApiProperty()
    yarnType: string;

    @ApiProperty()
    countNum: number;

    @ApiProperty()
    countDenom: number;

    @ApiProperty()
    uomId: number;

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    updatedUser: string | null;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;

    @ApiProperty()
    versionFlag: number;


}

