import { ApiProperty } from "@nestjs/swagger";


export class PurchaseOrderFbricDto{
@ApiProperty()
poFabricId:number

@ApiProperty()
  colourId:number

  @ApiProperty()
  productGroupId:number

  
  @ApiProperty()
  remarks : string;

  @ApiProperty()
fabricTypeId:number

@ApiProperty()
fabricCode:string


@ApiProperty()
m3FabricCode:number

@ApiProperty()
shahiFabricCode:string

@ApiProperty()
content:string

@ApiProperty()
weaveId:number

@ApiProperty()
weight:number

@ApiProperty()
width:number

@ApiProperty()
construction:number

@ApiProperty()
yarnCount:number

@ApiProperty()
finish:string

@ApiProperty()
shrinkage:string

@ApiProperty()
pch:number

@ApiProperty()
moq:string

@ApiProperty()
indentFabricId:number

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