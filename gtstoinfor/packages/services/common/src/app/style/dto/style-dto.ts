import { ApiProperty } from "@nestjs/swagger";

export class StyleReq {
 @ApiProperty()
  styleId:number;
  @ApiProperty()
 locationId:number;
 @ApiProperty()
  profitControlHeadId:number;
  @ApiProperty()
  style:string;
  @ApiProperty()
  description:string;
  @ApiProperty()
  styleFileName: string;
  @ApiProperty()
  styleFilePath: string;
  @ApiProperty()
  isActive:boolean;
  @ApiProperty()
  createdUser: string | null;
  @ApiProperty()
  updatedUser: string | null;
  constructor(
    styleId:number,
    locationId:number,
    profitControlHeadId:number,
    style:string,
    description:string,
    styleFileName: string,
    styleFilePath:string,
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
    this.isActive=isActive
    this.profitControlHeadId=profitControlHeadId
    this.createdUser=createdUser
    this.updatedUser=updatedUser

  }


}
