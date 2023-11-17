import { ApiProperty } from "@nestjs/swagger";

export class StocksDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    m3_style_id: number;
    @ApiProperty()
    item_type_id: number;
    @ApiProperty()
    item_id: number;
    @ApiProperty()
    location_id: number;
    @ApiProperty()
    plant: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    style_id: number;
}