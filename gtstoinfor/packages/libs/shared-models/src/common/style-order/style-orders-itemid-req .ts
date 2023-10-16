export class styleOrderReq {
    itemId:number
    coId?:number
    constructor(itemId:number, coId?:number){
        this.itemId = itemId
        this.coId = coId
    }
}