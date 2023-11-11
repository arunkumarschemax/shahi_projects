export class CoLineReq{
    orderNumber: string;
    exfactoryDate: any;
    deliveryDate: any;
    season: string;
    buyerPoNumber: string;
    CoLineItems: CoLineItemsReq[];
    coLineNumber: string;
    coLineId?: number;
    constructor(orderNumber: string,exfactoryDate: any,deliveryDate: any,season: string,buyerPoNumber: string,CoLineItems: CoLineItemsReq[],coLineNumber: string,coLineId?: number){
        this.orderNumber = orderNumber
        this.exfactoryDate = exfactoryDate
        this.deliveryDate = deliveryDate
        this.season = season
        this.buyerPoNumber = buyerPoNumber
        this.CoLineItems = CoLineItems
        this.coLineNumber = coLineNumber
        this.coLineId = coLineId

    }
}

export class CoLineItemsReq{
    skuCode: string;
    color: string;
    size: string;
    destination: string;
    quantity: number;
    price: number;
    deliveryAddress : number;
    colorId: number;
    sizeId: number;
    destinationId: number;

    constructor(skuCode: string,color: string,size: string,destination: string,quantity: number,price: number,deliveryAddress : number,colorId: number,sizeId: number,destinationId: number){
        this.skuCode = skuCode
        this.color = color
        this.size = size
        this.destination = destination
        this.quantity = quantity
        this.price = price
        this.deliveryAddress = deliveryAddress
        this.colorId = colorId
        this.sizeId = sizeId
        this.destinationId = destinationId
    }
}