export class FeatureFilterRequest {

    featureCode?:string;
    featureName?: string;
    optionGroup?: string;
 
    
    
    
        constructor(
            featureCode?:string,featureName?: string,optionGroup?: string,
        ) {
            this.featureCode = featureCode
            this.featureName = featureName
            this.optionGroup =optionGroup 
            
        }
    }
    