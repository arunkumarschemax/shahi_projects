export class TabNameReq{
    tabName:string;
    styleId?: number
    styleNo?:string;
    sampleRequestId?:number;
    constructor(tabName:string,styleId: number,styleNo?:string,sampleRequestId?:number){
        this.tabName = tabName
        this.styleId = styleId
        this.styleNo = styleNo
        this.sampleRequestId = sampleRequestId
    }

}