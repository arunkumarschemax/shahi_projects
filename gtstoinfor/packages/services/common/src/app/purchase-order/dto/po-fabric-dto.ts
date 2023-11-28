import { ApiProperty } from "@nestjs/swagger";


export class PurchaseOrderFbricDto{
@ApiProperty()
poFabricId:number

@ApiProperty()
  colourId:number
  
  @ApiProperty()
  remarks : string;
@ApiProperty()
m3FabricCode:number
@ApiProperty()
indentFabricId:number

@ApiProperty()
sampleReqFabricId:number

@ApiProperty()
quantityUomId:number

@ApiProperty()
poQuantity:number

@ApiProperty()
  createdAt: string;

  @ApiProperty()
  createdUser: string | null;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  updatedUser: string | null;

  @ApiProperty()
  versionFlag: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  grnQuantity:number

}