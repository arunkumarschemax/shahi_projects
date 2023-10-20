import { ApiProperty } from "@nestjs/swagger";

export class StyleOrderId {
 @ApiProperty()
  styleOrderId:number;
  
  constructor(
    styleOrderId:number
  ){
    this.styleOrderId=styleOrderId
  }


}
