export class RmMappingFilterRequest {

    fgItemId?:number;
    fgItemCode?:string;
    rmItemCode?: string;
    optionGroup?: string;
 
    
    
    
        constructor(
            fgItemId?:number,fgItemCode?:string,rmItemCode?: string,optionGroup?: string,
        ) {
            this.fgItemId = fgItemId
            this.fgItemCode = fgItemCode
            this.rmItemCode = rmItemCode
            this.optionGroup =optionGroup 
            
        }
    }
    