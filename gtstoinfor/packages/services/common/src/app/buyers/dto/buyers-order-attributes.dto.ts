import { ApiProperty } from "@nestjs/swagger";
import { BuyerOrderAttributeInfo } from "./buyers-order-attributes-info";

export class BuyersOrderAttributeDto{
    @ApiProperty()
    buyerOrderAttributeId : number;

    @ApiProperty()
    buyerId: number;

    // @ApiProperty({type:BuyerOrderAttributeInfo})
    @ApiProperty()
    attributeInfo: BuyerOrderAttributeInfo[]

    @ApiProperty()
    isActive: boolean;
  
    createdAt : Date;
  
    @ApiProperty()
    createdUser : string;
  
    updatedAt : Date;
    @ApiProperty()
    updatedUser : string;
  
    @ApiProperty()
    versionFlag : number;


}

