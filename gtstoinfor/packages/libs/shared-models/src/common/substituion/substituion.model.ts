export class SubstituionModel{
    substituionId: number;
    fgItemCode: string;
    fgItemId: number;
    rmItemCode: string;
    rmItemId: number;
    fgSku: string;
    fgSkuId: number;
    rmSku: string;
    rmSkuId: number;
    consumption: number;
    itemTypeId: number;
    itemGroupId: number;
    itemType: string;
    isActive: string;

    constructor(substituionId: number,fgItemCode: string,fgItemId: number,rmItemCode: string,rmItemId: number,fgSku: string,fgSkuId: number,rmSku: string,rmSkuId: number,consumption: number,itemTypeId: number,itemGroupId: number,itemType: string,isActive: string){
        this.substituionId = substituionId
        this.fgItemCode = fgItemCode
        this.fgItemId = fgItemId
        this.rmItemCode = rmItemCode
        this.rmItemId = rmItemId
        this.fgSku = fgSku
        this.fgSkuId = fgSkuId
        this.rmSku = rmSku
        this.rmSkuId = rmSkuId
        this.consumption = consumption
        this.itemTypeId = itemTypeId
        this.itemGroupId = itemGroupId
        this.itemType = itemType
        this.isActive = isActive
    }
}