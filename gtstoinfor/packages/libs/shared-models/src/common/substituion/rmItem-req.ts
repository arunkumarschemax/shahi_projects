export class RmItemModel{
    rmItemId:number;
    fgItemId: number;

    itemType:string;
    // rmSkuCode:string;
    featureCode:string;
    status:string;
    itemCode:string;
    featureOptionId:number;
    optionGroup:string;
    optionId:number;
    optionValue:string;

    // fgSkuId:number;
    // fgSkuCode:string;
    constructor(     fgItemId: number,
        rmItemId:number,itemType:string,rmSkuCode:string,featureCode:string,status:string,itemCode:string,featureOptionId:number,optionGroup:string,optionId:number,optionValue:string)
    {
      this.rmItemId=rmItemId;
      this.itemCode=itemCode;
      this.itemType=itemType;
      // this.rmSkuCode=rmSkuCode;
      this.featureCode=featureCode;
      this.status=status;
      this.featureOptionId=featureOptionId;
      this.optionGroup=optionGroup;
      this.optionId=optionId;
      this.optionValue=optionValue;
      this.fgItemId=fgItemId;
    //   this.fgSkuId=this.fgSkuId;
    //   this.fgSkuCode=this.fgSkuCode;
    }
}