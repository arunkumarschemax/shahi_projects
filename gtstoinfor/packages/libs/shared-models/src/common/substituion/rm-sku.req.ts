export class Rm{
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
    rmSku: string
   rmSkuId: number
consumption:string
    constructor( 
      rmSku: string,
      rmSkuId: number,
      rmItemId:number,
      itemType:string,
      rmSkuCode:string,
      featureCode:string,
      status:string,
      itemCode:string,
      featureOptionId:number,
      optionGroup:string,
      optionId:number,
      optionValue:string,
      consumption:string

      )
    {
      this.rmSku = rmSku
      this.rmSkuId = rmSkuId
      this.rmItemId=rmItemId;
      this.itemType=itemType;
      this.rmSkuCode=rmSkuCode;
      this.featureCode=featureCode;
      this.status=status;
      this.featureOptionId=featureOptionId;
      this.optionGroup=optionGroup;
      this.optionId=optionId;
      this.optionValue=optionValue;
      this.consumption = consumption
      this.itemCode = itemCode
    }
}