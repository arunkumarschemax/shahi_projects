export class RmMappingFilterRequest {

    fgItemId?:number;
    fgItemCode?:string;
    featureName?: string;
    optionGroup?: string;
 
    
    
    
        constructor(
            fgItemId?:number,fgItemCode?:string,featureName?: string,optionGroup?: string,
        ) {
            this.fgItemId = fgItemId
            this.fgItemCode = fgItemCode
            this.featureName = featureName
            this.optionGroup =optionGroup 
            
        }
    }
    