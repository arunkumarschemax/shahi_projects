export class BuyerIdReq{
    buyerId:number;
    externalRef?: number

    constructor(buyerId:number,externalRef?: number){
        this.buyerId = buyerId
        this.externalRef = externalRef
    }
}