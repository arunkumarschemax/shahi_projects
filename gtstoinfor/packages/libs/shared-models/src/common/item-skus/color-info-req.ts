export class ColorInfoReq{
    colorId: number;
    color:string;

    constructor(colorId: number,color:string){
        this.colorId = colorId;
        this.color = color;
    }
}