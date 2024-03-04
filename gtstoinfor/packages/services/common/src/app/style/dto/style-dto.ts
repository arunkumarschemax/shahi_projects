import { ApiProperty } from "@nestjs/swagger";

export class StyleReq {
 @ApiProperty()
  styleId:number;
  @ApiProperty()
 locationId:string;
 @ApiProperty()
  pch:number;
  @ApiProperty()
  style:string;
  @ApiProperty()
  description:string;
  @ApiProperty()
  styleFileName: string;
  @ApiProperty()
  styleFilePath: string;
  @ApiProperty()
  buyerId: number;
  @ApiProperty()
  brandId: number;
  @ApiProperty()
  dmm: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  isActive:boolean;
  @ApiProperty()
  createdUser: string | null;
  @ApiProperty()
  updatedUser: string | null;
  constructor(
    styleId:number,
    locationId:string,
    pch:number,
    style:string,
    description:string,
    styleFileName: string,
    styleFilePath:string,
    buyerId: number,
    brandId: number,
    dmm: number,
    productId: number,
    isActive:boolean,
    createdUser: string | null,
    updatedUser: string | null,
  ){
    this.styleId=styleId
    this.style=style
    this.description=description
    this.styleFileName=styleFileName
    this.styleFilePath=styleFilePath
    this.locationId=locationId
    this.buyerId=buyerId
    this.brandId=brandId
    this.dmm=dmm
    this.isActive=isActive
    this.pch=pch
    this.productId=productId
    this.createdUser=createdUser
    this.updatedUser=updatedUser
  }


}
