import { RmSkuModel, RmSkuReq } from "../rm-skus";
import { RmItemModel } from "./rmItem-req";

export class RmDataModel{
    // rmItemId:number;
    // itemType:string;
    // rmSkuCode:string;
    // featureCode:string;
    // status:string;
    // itemCode:string;
    // featureOptionId:number;
    // optionGroup:string;
    // optionId:number;
    // optionValue:string;
    fgItemId: number;
    fgSkuId:number;
    fgSkuCode:string;
    rmItem:RmItemModel[]
    constructor(     fgItemId: number,
      fgSkuId:number, fgSkuCode:string,rmItem:RmItemModel[])
    {
      // this.rmItemId=rmItemId;
      // this.itemType=itemType;
      // this.rmSkuCode=rmSkuCode;
      // this.featureCode=featureCode;
      // this.status=status;
      // this.featureOptionId=featureOptionId;
      // this.optionGroup=optionGroup;
      // this.optionId=optionId;
      // this.optionValue=optionValue;
      this.fgItemId=fgItemId
      this.fgSkuId=fgSkuId;
      this.fgSkuCode=fgSkuCode;
      this.rmItem=rmItem
    }
}