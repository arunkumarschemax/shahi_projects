export class RmDataModel{
    rmItemId:number;
    itemType:string;
    rmSkuCode:string;
    featureCode:string;
    status:string;
    itemCode:string;
    featureOptionId:number;
    optionGroup:string;
    optionId:number;
    optionValue:string;

    constructor( rmItemId:number,itemType:string,rmSkuCode:string,featureCode:string,status:string,itemCode:string,featureOptionId:number,optionGroup:string,optionId:number,optionValue:string)
    {
      this.rmItemId=rmItemId;
      this.itemType=itemType;
      this.rmSkuCode=rmSkuCode;
      this.featureCode=featureCode;
      this.status=status;
      this.featureOptionId=featureOptionId;
      this.optionGroup=optionGroup;
      this.optionId=optionId;
      this.optionValue=optionValue;
    }
}