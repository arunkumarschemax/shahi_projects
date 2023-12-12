import { ApiProperty } from "@nestjs/swagger"
import { PoItemEnum } from "@project-management-system/shared-models"

export class PoItemdetails{

 @ApiProperty()
 purchaseOrderItemId:number
  
  @ApiProperty()
  colourId:number

  @ApiProperty()
  m3ItemId:number

  @ApiProperty()
  poQuantity:number

  @ApiProperty()
  quantityUomId:number

  @ApiProperty()
 poitemStatus:PoItemEnum

 @ApiProperty()
  grnQuantity:number

  @ApiProperty()
  sampleItemId:number

  @ApiProperty()
  indentItemId:number
  
  @ApiProperty()
  unitPrice:number

  @ApiProperty()
  discount:number

  @ApiProperty()
  tax:number

  @ApiProperty()
  transportation:number

  @ApiProperty()
  subjectiveAmount:number

  @ApiProperty()
  createdUser: string | null;


  @ApiProperty()
  updatedUser: string | null;

  @ApiProperty()
  versionFlag: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  indentId:number

  @ApiProperty()
  sampleRequestId:number

  @ApiProperty()  
  sampleReqId:number

  @ApiProperty()
  styleId:number

}