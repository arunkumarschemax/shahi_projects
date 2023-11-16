import { CoLineStatusEnum } from "../../enum";

export class CoLineReq{
    coId: number;
    orderNumber: string;
    exfactoryDate: any;
    deliveryDate: any;
    season: string;
    buyerPoNumber: string;
    coLineInfo: CoLineItemsReq[];
    coNumber: string;
    coLineId?: number;
    skucodes?:any[]
    constructor(coId: number,orderNumber: string,exfactoryDate: any,deliveryDate: any,season: string,buyerPoNumber: string,coLineInfo: CoLineItemsReq[],coNumber: string,coLineId?: number,skucodes?:any[]){
        this.coId = coId
        this.orderNumber = orderNumber
        this.exfactoryDate = exfactoryDate
        this.deliveryDate = deliveryDate
        this.season = season
        this.buyerPoNumber = buyerPoNumber
        this.coLineInfo = coLineInfo
        this.coNumber = coNumber
        this.coLineId = coLineId
        this.skucodes = skucodes

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
    discount: number;
    status : CoLineStatusEnum;
    uomId:number;
    uom : string;

    constructor(skuCode: string,color: string,size: string,destination: string,quantity: number,price: number,deliveryAddress : number,colorId: number,sizeId: number,destinationId: number,discount: number,status : CoLineStatusEnum,uomId:number,uom : string){
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
        this.discount = discount
        this.status = status
        this.uomId = uomId
        this.uom = uom
    }
}