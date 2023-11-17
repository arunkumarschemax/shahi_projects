import { RmDataModel } from "./rm-sku-model";

export class FgDataModel{
    // substituionId: number;
    fgItemCode: string;
    fgItemId: number;
    // rmItemCode: string;
    // rmItemId: number;
    // fgSku: string;
    // fgSkuId: number;
    // rmSku: string;
    // rmSkuId: number;
    // consumption: number;
    // itemTypeId: number;
    // itemGroupId: number;
    // itemType: string;
    // isActive: string;
    rmData:RmDataModel[]

    constructor(
        // substituionId: number,
        fgItemCode: string,
        fgItemId: number,
        // rmItemCode: string,
        // rmItemId: number,
        // fgSku: string,
        // fgSkuId: number,
        // rmSku: string,
        // rmSkuId: number,
        // consumption: number,
        // itemTypeId: number,
        // itemGroupId: number,
        // itemType: string,
        // isActive: string,
        rmData:RmDataModel[]){
        // this.substituionId = substituionId
        this.fgItemCode = fgItemCode
        this.fgItemId = fgItemId
        // this.rmItemCode = rmItemCode
        // this.rmItemId = rmItemId
        // this.fgSku = fgSku
        // this.fgSkuId = fgSkuId
        // this.rmSku = rmSku
        // this.rmSkuId = rmSkuId
        // this.consumption = consumption
        // this.itemTypeId = itemTypeId
        // this.itemGroupId = itemGroupId
        // this.itemType = itemType
        // this.isActive = isActive
        this.rmData = rmData
    }
}