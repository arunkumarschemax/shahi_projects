import { ApiProperty } from "@nestjs/swagger";

export class VariantIdReq {
 @ApiProperty()
  variantId:number;
  
  constructor(
    variantId:number
  ){
    this.variantId=variantId
  }


}
