
export class OperationSKUModel{
    itemsId:number;
    operationName:string;
    SKUId:number;
    SKUCode:string;
    colorId:number;
    color:string;
    sizeId:number;
    size:string;
    destinationId:number
    destination:string;
    styleId:number;
    style:string;
    quantity:string;
    issuedQuantity:string


    constructor(itemsId:number,
        operationName:string,
        SKUId:number,
        SKUCode:string,
        colorId:number,
        color:string,
        sizeId:number,
        size:string,
        destinationId:number,
        destination:string,
        styleId:number,
        style:string,
        quantity:string,
        issuedQuantity:string,
    ){
        this.itemsId = itemsId;
        this.operationName = operationName
        this.SKUId = SKUId
        this.SKUCode = SKUCode
        this.colorId = colorId
        this.color = color
        this.sizeId = sizeId
        this.size = size
        this.destinationId = destinationId
        this.destination = destination
        this.styleId = styleId
        this.style = style
        this.quantity = quantity
        this.issuedQuantity = issuedQuantity
    
}
}
