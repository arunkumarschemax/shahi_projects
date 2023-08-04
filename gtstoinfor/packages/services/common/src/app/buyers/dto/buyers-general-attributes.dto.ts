import { ApiProperty } from "@nestjs/swagger";
import { BuyerGeneralAttributeInfo } from "./buyers-general-attributes-info";

export class BuyersGeneralAttributeDto{
    @ApiProperty()
    buyerGeneralAttributeId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    attributeInfo: BuyerGeneralAttributeInfo[];

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