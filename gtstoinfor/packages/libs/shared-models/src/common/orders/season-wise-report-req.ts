export class SeasonWiseRequest{
    itemCode? : number;
    itemName?: string;
    constructor(itemCode?:number,itemName?: string)
    {
        this.itemCode = itemCode
        this.itemName = itemName
    }
}