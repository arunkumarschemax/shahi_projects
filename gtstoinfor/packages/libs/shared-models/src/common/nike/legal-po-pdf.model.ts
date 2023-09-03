export class LegalPoPdfModel{
    poNumber:string;
    poLine:string;
    vasText:string;
    size:string;
    quantity:string;
    price:string;

    constructor(
        poNumber?:string,
        poLine?:string,
        vasText?:string,
        size?:string,
        quantity?:string,
        price?:string,
    ){
        this.poNumber = poNumber
        this.poLine = poLine
        this.price = price 
        this.quantity = quantity
        this.size = size
        this.vasText= vasText
    }
}