export class FobPriceDiffRequest {
    
   
    poAndLine?: string;
    styleNumber?:string;
    sizeDescription?:string;

    constructor(
        poAndLine?: string,styleNumber?:string,sizeDescription?:string
        
    ) {
        
        this.poAndLine = poAndLine;
        this.styleNumber = styleNumber; 
        this.sizeDescription = sizeDescription;
        
        
    }
}