import { FeatureOptionModel } from "./feature-option.model";

export class FeatureModel{
    featureId: number;
    featureCode: string;
    featureName: string;
    option: string;
    optionInfo: FeatureOptionModel[];
    description: string;
    optionsData: any[];

    constructor(featureId: number,featureCode: string,featureName: string,option: string,optionInfo: FeatureOptionModel[],description: string,optionsData: any[]){
        this.featureId = featureId
        this.featureCode = featureCode
        this.featureName = featureName
        this.option = option
        this.optionInfo = optionInfo
        this.description = description
        this.optionsData = optionsData
    }
}