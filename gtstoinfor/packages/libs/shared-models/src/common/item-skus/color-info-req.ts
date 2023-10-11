export class ColorInfoReq{
    colourId: number;
    colour:string;

    constructor(colourId: number,colour:string){
        this.colourId = colourId;
        this.colour = colour;
    }
}