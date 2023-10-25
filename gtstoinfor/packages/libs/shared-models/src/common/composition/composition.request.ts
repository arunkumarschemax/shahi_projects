export class CompositionRequest{
    id?:number;
    compositionCode: string;
    compositionDescription: string;
    
    constructor(compositionCode: string,
        compositionDescription: string,    id?:number
        ){
        this.compositionCode = compositionCode;
        this.compositionDescription = compositionDescription
        this.id = id
    }
}