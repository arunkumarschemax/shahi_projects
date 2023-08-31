export class BuyerDestinationInfoModel{
    buyerId: number;
    buyerName?: string;
    

    constructor(buyerId: number,buyerName?: string){
        this.buyerId = buyerId;
        this.buyerName = buyerName;
    }

}