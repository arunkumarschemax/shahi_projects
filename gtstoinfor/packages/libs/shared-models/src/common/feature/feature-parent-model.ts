import { FeatureOptionModel } from "./feature-option.model";

export class FeatureModel{
    featureId: number;
    featureCode: string;
    featureName: string;
    option: string;
    optionInfo: FeatureOptionModel[];
    description: string;

    constructor(featureId: number,featureCode: string,featureName: string,option: string,optionInfo: FeatureOptionModel[],description: string){
        this.featureId = featureId
        this.featureCode = featureCode
        this.featureName = featureName
        this.option = option
        this.optionInfo = optionInfo
        this.description = description
    }
}