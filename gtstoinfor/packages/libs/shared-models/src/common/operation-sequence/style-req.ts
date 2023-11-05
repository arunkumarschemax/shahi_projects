export class StyleRequest{
    styleId?: number;
    style?:string

    constructor(styleId?:number,style?:string){
        this.styleId = styleId
        this.style = style
    }
}