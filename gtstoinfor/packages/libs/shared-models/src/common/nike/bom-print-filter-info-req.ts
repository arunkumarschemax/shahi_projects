export class BomPrintFilterReq{
    item: any
    style: any;
    trimName:string

    constructor(item:any,style:any,trimName:string){
        this.item = item
        this.style = style
        this.trimName = trimName
    }
}