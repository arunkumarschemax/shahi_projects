import { ApiProperty } from "@nestjs/swagger";

export class BuyerRequest{
    @ApiProperty()
    buyerId:number
   constructor(
    buyerId:number
   ){
    this.buyerId=buyerId
   }
}