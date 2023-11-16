import { RmDataModel } from "./rm-sku-model";

export class FgDataModel{
    fgItemCode: string;
    fgItemId: number;
    
    rmData:RmDataModel[]

    constructor(fgItemCode: string,fgItemId: number,rmData:RmDataModel[]){
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