export class YearReq{
    year: number;
    tabName:string;
    itemName?:string;

    constructor(year:number,tabName:string,itemName?:string)
    {
        this.year = year
        this.tabName = tabName
        this.itemName=itemName

    }
}
