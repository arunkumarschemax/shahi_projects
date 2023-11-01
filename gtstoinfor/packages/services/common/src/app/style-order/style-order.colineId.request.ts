import { ApiProperty } from "@nestjs/swagger";

export class StyleOrderColineIdReq {
 @ApiProperty()
  CoLineId:number;
  
  constructor(
    CoLineId:number
  ){
    this.CoLineId=CoLineId
  }


}
