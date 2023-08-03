import { ApiProperty } from "@nestjs/swagger";
import { BuyerGeneralAttributeInfo } from "./buyers-general-attributes-info";

export class BuyersGeneralAttributeDto{
    @ApiProperty()
    buyerGeneralAttributeId: number;

    @ApiProperty()
    vendorId: number;

    @ApiProperty()
    attributeInfo: BuyerGeneralAttributeInfo[]
}