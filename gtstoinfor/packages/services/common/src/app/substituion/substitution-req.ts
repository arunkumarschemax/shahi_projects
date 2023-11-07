import { ApiProperty } from "@nestjs/swagger";
import { RmItemTypeEnum } from "@project-management-system/shared-models";
import { type } from "os";

export class SubstituionRequest{
    @ApiProperty()
    fgItemId:number;
    @ApiProperty()
    fgItemCode:string;
    @ApiProperty()
    itemTypeId:number;
    @ApiProperty()
    createdUser:string;
    @ApiProperty()
    mappedInfo:MappedInfo[]
//   constructor(fgItemId:number,fgItemCode:string,itemTypeId:number,mappedInfo:MappedInfo[]){
//     this.fgItemId = fgItemId;
//     this.fgItemCode = fgItemCode;
//     this.itemTypeId = itemTypeId;
//     this.mappedInfo = mappedInfo;
//   }
  
}
export class MappedInfo{
    @ApiProperty()
    fgSkuCode:string
    @ApiProperty()
    fgSkuId:number
    @ApiProperty()
    mappedRmSKuList:mappedRmSKU[]

  }
  export class mappedRmSKU{
    @ApiProperty()
    rmItemCode:string
    @ApiProperty()
    rmItemId:number
    @ApiProperty()
    rmSkuId:number
    @ApiProperty()
    rmSKuCode:string
    @ApiProperty()
    consumption:number
    @ApiProperty()
    itemGroupId:number
    @ApiProperty()
    rmItemType:RmItemTypeEnum
  }