import { ApiProperty } from "@nestjs/swagger";
import { BuyerOrderAttributeInfo } from "./buyers-order-attributes-info";

export class BuyersOrderAttributeDto{
    @ApiProperty()
    buyerOrderAttributeId : number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty({type:BuyerOrderAttributeInfo})
    attributeInfo: BuyerOrderAttributeInfo[]



    constructor(buyerOrderAttributeId : number,buyerId: number,
     attributeInfo: BuyerOrderAttributeInfo[]) {
      
      this.buyerOrderAttributeId = buyerOrderAttributeId,
      this.buyerId = buyerId,
      this.attributeInfo = attributeInfo
}


}