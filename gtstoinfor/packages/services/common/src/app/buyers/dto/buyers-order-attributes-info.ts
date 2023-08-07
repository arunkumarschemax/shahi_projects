import { ApiProperty } from "@nestjs/swagger";

export class BuyerOrderAttributeInfo{
    @ApiProperty()
    attributeName : string;

    @ApiProperty()
    attributeValue:string;

    @ApiProperty()
    attributeId: number;

    @ApiProperty()
    buyerGeneralAttributeId: number;



    
}