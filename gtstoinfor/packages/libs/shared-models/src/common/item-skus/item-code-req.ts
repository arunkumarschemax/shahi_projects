export class ItemCodeReq{
    itemCode: string;
    destinationId?: number
    constructor(itemCode: string,destinationId?: number){
        this.itemCode = itemCode
        this.destinationId = destinationId
    }
}