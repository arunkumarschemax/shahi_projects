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
    coLineId?: number;
    coLineNumber?: string;
    skuCode?: string;
    coId?: number;
    styleOrderInfo?: any;


    constructor(deliveryAddress : string,orderQuantity: number,color : string,size : string,destination : string,uom : string,status : CustomerOrderStatusEnum,discount: number,salePrice: number,coPercentage: number,colorId: number,sizeId: number,destinationId: number,uomId: number,coLineId?:number,coLineNumber?: string,skuCode?: string,coId?: number,styleOrderInfo?:any){
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
    this.coLineId = coLineId
    this.coLineNumber = coLineNumber
    this.skuCode = skuCode
    this.coId = coId
    this.styleOrderInfo = styleOrderInfo

    }

}