export class CompositionRequest{
    compositionCode: string;
    compositionDescription: string;
    
    constructor(compositionCode: string,
        compositionDescription: string){
        this.compositionCode = compositionCode;
        this.compositionDescription = compositionDescription
    }
}