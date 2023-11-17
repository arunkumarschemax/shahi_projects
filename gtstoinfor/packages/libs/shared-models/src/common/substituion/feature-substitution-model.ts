export class FeatureSubstitutionModel{
    fgItemId: number;
    fgItemCode: string;
    featuresInfo : FeatureInfoModel[];
    constructor(fgItemId: number,fgItemCode: string,featuresInfo : FeatureInfoModel[]){
    this.fgItemId = fgItemId
    this.fgItemCode = fgItemCode
    this.featuresInfo = featuresInfo

    }
}

export class FeatureInfoModel{
    featureCode: string;
    featureId: number;
    option: string;
    optionInfo:optionInfoModel[];
    fgInfo:fgInfoModel[];
    constructor(featureCode: string,featureId: number,option: string,optionInfo:optionInfoModel[],fgInfo:fgInfoModel[]){
    this.featureCode  = featureCode 
    this.featureId  = featureId 
    this.option  = option 
    this.optionInfo  = optionInfo 
    this.fgInfo = fgInfo
    }
}

export class optionInfoModel{
    optionValue:string;
    rmItemId:number;
    rmItemCode: string;
    rmSkuId: number;
    rmSkuCode: string;
    featureOptionId: number;
    featureId: number;
    constructor(optionValue:string,rmItemId:number,rmItemCode: string,rmSkuId: number,rmSkuCode: string,featureOptionId: number,featureId: number){
        this.optionValue = optionValue
        this.rmItemId = rmItemId
        this.rmItemCode = rmItemCode
        this.rmSkuId = rmSkuId
        this.rmSkuCode = rmSkuCode
        this.featureOptionId = featureOptionId
        this.featureId = featureId
    }
}

export class fgInfoModel{
    fgOptionValue:string;
    fetaureCode: string;

    constructor(fgOptionValue:string,fetaureCode: string){
        this.fgOptionValue = fgOptionValue
        this.fetaureCode = fetaureCode
    }
}
    
    