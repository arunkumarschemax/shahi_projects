import { ApiProperty } from "@nestjs/swagger";

export class StocksDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    m3Item: number;
    @ApiProperty()
    itemType: string;
    @ApiProperty()
    buyerId: number;
    @ApiProperty()
    locationId: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    uomId: number;
    @ApiProperty()
    plant?: number;
}