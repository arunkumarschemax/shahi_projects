import { ApiProperty } from "@nestjs/swagger";

export class BuyerInfoDto{
    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    buyerName: string;
}   