export class BuyersDestinationRequest{
    buyerId:number
    BsId?:number;
    destinationId?:number;
    sizeId?:number;
    colourId?:number;


    
    constructor(buyerId:number, BsId?:number,destinationId?:number,sizeId?:number,colourId?:number){
        this.BsId = BsId;
        this.destinationId = destinationId
        this.sizeId = sizeId
        this.colourId = colourId
        this.buyerId = buyerId
    }
}