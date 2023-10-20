export class RangeRequest{
    rangeCode: string;
    rangeDescription: string;
    
    constructor(rangeCode: string,
        rangeDescription: string){
        this.rangeCode = rangeCode;
        this.rangeDescription = rangeDescription
    }
}