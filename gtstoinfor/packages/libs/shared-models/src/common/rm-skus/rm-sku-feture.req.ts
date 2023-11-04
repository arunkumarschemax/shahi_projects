export class RmSkuFeatureReq{
    featureCode: string;
    optionsData: any[];
    rmSkuId?: number;
    rmSkuCode?: string;
    constructor(featureCode: string,optionsData: any[],rmSkuId?: number,rmSkuCode?: string){
        this.featureCode = featureCode
        this.optionsData = optionsData
        this.rmSkuId = rmSkuId
        this.rmSkuCode = rmSkuCode
    }
    
}