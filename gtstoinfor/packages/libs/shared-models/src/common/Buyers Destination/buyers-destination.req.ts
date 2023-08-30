export class BuyersDestinationRequest{
    BsId?:number;
    destinationId?:number;
    sizeId?:number;
    colourId?:number;


    
    constructor( BsId?:number,destinationId?:number,sizeId?:number,colourId?:number){
        this.BsId = BsId;
        this.destinationId = destinationId
        this.sizeId = sizeId
        this.colourId = colourId
    }
}