import { CustomerOrderStatusEnum } from "../../enum";

export class StyleOrderItemsReq{
    deliveryAddress : string;
    orderQuantity: number;
    color : string;
    size : string;
    destination : string;
    uom : string;
    discount: number;
    salePrice: number;
    coPercentage: number;
    colorId: number;
    sizeId: number;
    destinationId: number;
    uomId: number;
    orderLineId?: number;
    skuCode?: string;
    coId?: number;
    styleOrderInfo?: any;


    constructor(deliveryAddress : string,orderQuantity: number,color : string,size : string,destination : string,uom : string,discount: number,salePrice: number,coPercentage: number,colorId: number,sizeId: number,destinationId: number,uomId: number,orderLineId?:number,skuCode?: string,coId?: number,styleOrderInfo?:any){
    this.deliveryAddress = deliveryAddress
    this.orderQuantity = orderQuantity
    this.color = color
    this.size = size
    this.destination = destination
    this.uom = uom
    this.discount= discount
    this.salePrice= salePrice
    this.coPercentage= coPercentage
    this.colorId= colorId
    this.sizeId= sizeId
    this.destinationId= destinationId
    this.uomId= uomId
    this.orderLineId = orderLineId
    this.skuCode = skuCode
    this.coId = coId
    this.styleOrderInfo = styleOrderInfo

    }

}