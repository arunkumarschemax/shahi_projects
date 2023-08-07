import { ApiProperty } from "@nestjs/swagger";

export class BuyerGeneralAttributeInfo{
    @ApiProperty()
    attributeName : string;

    @ApiProperty()
    attributeValue:string;

    @ApiProperty()
    attributeId: number;

    @ApiProperty()
    buyerGeneralAttributeId: number;

}