import { ApiProperty } from "@nestjs/swagger";

export class BuyerOrderAttributeInfo{
    @ApiProperty()
    attributeName : string;

    @ApiProperty()
    attributeValue:string;

    @ApiProperty()
    attributeId: number;


    constructor(attributeName:string, attributeValue:string,
        attributeId: number) {
         
         this.attributeName = attributeName,
         this.attributeValue = attributeValue,
         this.attributeId = attributeId
   }

    
}