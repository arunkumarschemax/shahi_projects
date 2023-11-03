import { ApiProperty } from "@nestjs/swagger";

export class StocksDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    m3ItemCode: string;
    @ApiProperty()
    shahiItemCode: string;
    @ApiProperty()
    itemType: number;
    @ApiProperty()
    location: number;
    @ApiProperty()
    plant: number;
    @ApiProperty()
    quantity: string;
}