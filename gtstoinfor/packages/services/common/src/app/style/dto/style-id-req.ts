import { ApiProperty } from "@nestjs/swagger";

export class StyleIdReq{
    @ApiProperty()
    styleId:number
    @ApiProperty()
   isActive?: boolean;
   @ApiProperty()
   versionFlag?: number;
   constructor(
    styleId:number,
   isActive?: boolean,
   versionFlag?: number
   ){
    this.styleId=styleId
    this.isActive=isActive
    this.versionFlag=versionFlag

   }
}