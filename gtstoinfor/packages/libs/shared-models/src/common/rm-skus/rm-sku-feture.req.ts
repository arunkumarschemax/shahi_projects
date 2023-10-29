export class RmSkuFeatureReq{
    featureCode: string;
    rmSkuId?: number;
    rmSkuCode?: string;
    constructor(featureCode: string,rmSkuId?: number,rmSkuCode?: string){
        this.featureCode = featureCode
        this.rmSkuId = rmSkuId
        this.rmSkuCode = rmSkuCode
    }
    
}