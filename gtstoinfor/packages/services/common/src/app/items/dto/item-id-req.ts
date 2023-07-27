import { ApiProperty } from "@nestjs/swagger";

export class ItemIdReq{
    @ApiProperty()
    itemId:number
    @ApiProperty()
   isActive?: boolean;
   @ApiProperty()
   versionFlag?: number;
   constructor(
    itemId:number,
   isActive?: boolean,
   versionFlag?: number
   ){
    this.itemId=itemId
    this.isActive=isActive
    this.versionFlag=versionFlag

   }


}