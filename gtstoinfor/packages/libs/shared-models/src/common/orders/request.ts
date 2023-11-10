export class YearReq{
    year: number;
    tabName:string;
    fildId1?: number;
    fildId2?: number;
    itemName?:string;
   
    constructor(year:number,tabName:string, fildId1?: number, fildId2?: number,itemName?:string)
    {
        this.year = year
        this.tabName = tabName
        this.itemName=itemName
        this.fildId1=fildId1
        this.fildId2=fildId2

    }
}
