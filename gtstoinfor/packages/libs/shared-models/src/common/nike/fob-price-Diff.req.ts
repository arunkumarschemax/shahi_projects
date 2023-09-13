export class FobPriceDiffRequest {
    
   
    poAndLine?: string;
    styleNumber?:string;
    sizeDescription?:string;
    poNumber?:string;

    constructor(
        poAndLine?: string,styleNumber?:string,sizeDescription?:string,poNumber?:string
        
    ) {
        
        this.poAndLine = poAndLine;
        this.styleNumber = styleNumber; 
        this.sizeDescription = sizeDescription;
        this.poNumber = poNumber
        
        
    }
}
