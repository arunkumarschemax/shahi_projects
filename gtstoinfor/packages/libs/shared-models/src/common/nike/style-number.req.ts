export class StyleNumberReq{
    style: string;
    trimName:string

    constructor(style:string,trimName:string){
        this.style = style
        this.trimName = trimName
    }
}

export class StyleIdReq {
    styleId : number

    constructor(styleId: number) {
        this.styleId = styleId;
    }
}
