import { CustomerOrderStatusEnum } from "../../enum";

export class StyleOrderItemsReq{
    deliveryAddress : string;
    orderQuantity: number;
    color : string;
    size : string;
    destination : string;
    uom : string;
    status : CustomerOrderStatusEnum;
    discount: number;
    salePrice: number;
    coPercentage: number;
    colorId: number;
    sizeId: number;
    destinationId: number;
    uomId: number;
    styleOrderItemId?: number;
    coLineNumber?: string;
    skuCode?: string;

    constructor(deliveryAddress : string,orderQuantity: number,color : string,size : string,destination : string,uom : string,status : CustomerOrderStatusEnum,discount: number,salePrice: number,coPercentage: number,colorId: number,sizeId: number,destinationId: number,uomId: number,styleOrderItemId?:number,coLineNumber?: string,skuCode?: string){
    this.deliveryAddress = deliveryAddress
    this.orderQuantity = orderQuantity
    this.color = color
    this.size = size
    this.destination = destination
    this.uom = uom
    this.status = status
    this.discount= discount
    this.salePrice= salePrice
    this.coPercentage= coPercentage
    this.colorId= colorId
    this.sizeId= sizeId
    this.destinationId= destinationId
    this.uomId= uomId
    this.styleOrderItemId = styleOrderItemId
    this.coLineNumber = coLineNumber
    this.skuCode = skuCode

    }

}