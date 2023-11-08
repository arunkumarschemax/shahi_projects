export class TabNameReq{
    tabName:string;
    styleId?: number
    styleNo?:string;
    constructor(tabName:string,styleId: number,styleNo?:string){
        this.tabName = tabName
        this.styleId = styleId
        this.styleNo = styleNo
    }

}