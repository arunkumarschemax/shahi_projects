import { RmItemModel } from "./rmItem-req";

export class RmSkuModel{
    // rmItemId:number;
    // itemType:string;
    rmSkuCode:string;
    fgItemId: number;

    // featureCode:string;
    // status:string;
    // itemCode:string;
    // featureOptionId:number;
    // optionGroup:string;
    // optionId:number;
    // optionValue:string;
item:RmItemModel[]
    
    constructor(     fgItemId: number,
        rmSkuCode:string,item:RmItemModel[])
    {
      // this.rmItemId=rmItemId;
      // this.itemType=itemType;
      this.rmSkuCode=rmSkuCode;
      this.item=item;
      this.fgItemId=fgItemId;
      // this.featureCode=featureCode;
      // this.status=status;
      // this.featureOptionId=featureOptionId;
      // this.optionGroup=optionGroup;
      // this.optionId=optionId;
      // this.optionValue=optionValue;
    //   this.fgSkuId=this.fgSkuId;
    //   this.fgSkuCode=this.fgSkuCode;
    }
}