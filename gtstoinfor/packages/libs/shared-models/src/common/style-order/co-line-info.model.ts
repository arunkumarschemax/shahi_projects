export class CoLineInfo {
    skuCode : string;
    color : string;
    size : string;
    destination : string;
    price : number;
    qty : number;
    colorId : number;
    sizeId : number;
    destinationId : number;
    discount : number;
    coPercentage : number;
    uomId : number;
    uom : string;
    coNumber: string;
    constructor(
        skuCode : string,
        color : string,
        size : string,
        destination : string,
        price : number,
        qty : number,
        colorId : number,
        sizeId : number,
        destinationId : number,
        discount : number,
        coPercentage : number,
        uomId : number,
        uom : string,
        coNumber: string
    ){
        this.skuCode = skuCode
        this.color = color
        this.size = size
        this.destination = destination
        this.price = price
        this.qty = qty
        this.colorId = colorId
        this.sizeId = sizeId
        this.destinationId = destinationId 
        this.discount = discount
        this.coPercentage = coPercentage
        this.uom = uom
        this.uomId = uomId
        this.coNumber = coNumber
    }
}