export class RmSkuFeatureModel{
    rmSkuId: number;
    rmSkuCode: string;
    featureCode: string;
    constructor(rmSkuId: number,rmSkuCode: string,featureCode: string){
        this.rmSkuId = rmSkuId
        this.rmSkuCode = rmSkuCode
        this.featureCode = featureCode
    }
    
}