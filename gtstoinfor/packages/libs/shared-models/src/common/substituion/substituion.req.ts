import { RmItemTypeEnum } from "../../enum";

export class SubstituionReq{
    fgItemId:number;
  fgItemCode:string;
  itemTypeId:number;
  mappedInfo:MappedInfo[]
  constructor(fgItemId:number,fgItemCode:string,itemTypeId:number,mappedInfo:MappedInfo[]){
    this.fgItemId = fgItemId;
    this.fgItemCode = fgItemCode;
    this.itemTypeId = itemTypeId;
    this.mappedInfo = mappedInfo;
  }
  
}
export class MappedInfo{
    fgSkuCode:string
    fgSkuId:number
    mappedRmSKuList:mappedRmSKU[]

  }
  export class mappedRmSKU{
    rmItemCode:string
    rmItemId:number
    rmSkuId:number
    rmSKuCode:string
    consumption:number
    rmItemType:RmItemTypeEnum
  }