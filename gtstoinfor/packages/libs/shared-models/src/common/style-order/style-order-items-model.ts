import { CustomerOrderStatusEnum } from "../../enum";

export class StyleOrderItemsModel{
    styleOrderItemsId: number;
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
    landmark?: string;
    city?: string;
    state?: string;


    constructor(styleOrderItemsId: number,deliveryAddress : string,orderQuantity: number,color : string,size : string,destination : string,uom : string,status : CustomerOrderStatusEnum,discount: number,salePrice: number,coPercentage: number,colorId: number,sizeId: number,destinationId: number,uomId: number,landmark?: string,city?: string,state?: string){
    this.styleOrderItemsId = styleOrderItemsId
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
    this.landmark = landmark
    this.city = city
    this.state = state

    }

}