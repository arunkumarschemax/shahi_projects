export class ColourInfoModel{
    colourId: number;
    colour?: string;
    

    constructor(colourId: number,colour?: string){
        this.colourId = colourId;
        this.colour = colour;
    }

}