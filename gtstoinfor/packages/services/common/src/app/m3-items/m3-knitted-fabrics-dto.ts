import { ApiProperty } from '@nestjs/swagger';
export class M3KnittedFabricsDTO {

    @ApiProperty()
    m3ItemsId: number;

    @ApiProperty()
    kniteContent: number;

    @ApiProperty()
    kniteDescription: string;

    @ApiProperty()
    kniteRemarks: string;

    @ApiProperty()
    kniteGauze: string;

    @ApiProperty()
    kniteYarnCount: string;

    @ApiProperty()
    kniteHsn: string;

    @ApiProperty()
    kniteM3Code: string;

    @ApiProperty()
    knitWeight: string;

    @ApiProperty()
    knitType: string;

    @ApiProperty()
    knittedFabricTypeId: number;

    @ApiProperty()
    knittedBuyerId: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
    versionFlag: number;

    @ApiProperty()
    knitBuyerCode: string;
}

