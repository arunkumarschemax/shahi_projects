import { Rm } from "./rm-sku.req"

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
    fgSku: string
   fgSkuId: number
   rmDetails: Rm[]

    constructor( 
      fgSku: string,
      fgSkuId: number,
      // rmItemId:number,
      // itemType:string,
      // rmSkuCode:string,
      // featureCode:string,
      // status:string,
      // itemCode:string,
      // featureOptionId:number,
      // optionGroup:string,
      // optionId:number,
      // optionValue:string
      rmDetails: Rm[]
      )
    {
      this.fgSku = fgSku
      this.fgSkuId = fgSkuId
      this.rmDetails = rmDetails
      // this.rmItemId=rmItemId;
      // this.itemType=itemType;
      // this.rmSkuCode=rmSkuCode;
      // this.featureCode=featureCode;
      // this.status=status;
      // this.featureOptionId=featureOptionId;
      // this.optionGroup=optionGroup;
      // this.optionId=optionId;
      // this.optionValue=optionValue;
    }
}