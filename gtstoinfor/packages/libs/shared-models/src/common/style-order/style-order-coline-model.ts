import { CustomerOrderStatusEnum } from "../../enum";

export class StyleOrderCoLineModel{
    coLineId: number;
    buyerPoNumber : string;
    seasonCode : string;
    coLineNumber: string;
    orderNumber: string;
    skuCode: string;
    deliveryAddress : string;
    orderQuantity : number;
    color : string;
    size : string;
    destination : string;
    uom : string;
    status : CustomerOrderStatusEnum;
    discount: number;
    salePrice: number;
    coPercentage: number;
    deliveryDate: Date;
    exfDate: Date;
    colorId: number;
    sizeId: number;
    destinationId: number;
    uomId: number;
    coId: number;


    constructor(
        coLineId: number,
    buyerPoNumber : string,
    seasonCode : string,
    coLineNumber: string,
    orderNumber: string,
    skuCode: string,
    deliveryAddress : string,
    orderQuantity : number,
    color : string,
    size : string,
    destination : string,
    uom : string,
    status : CustomerOrderStatusEnum,
    discount: number,
    salePrice: number,
    coPercentage: number,
    deliveryDate: Date,
    exfDate: Date,
    colorId: number,
    sizeId: number,
    destinationId: number,
    uomId: number,
    coId: number, ){
    this.coLineId = coLineId
    this.buyerPoNumber = buyerPoNumber
    this.seasonCode = seasonCode
    this.coLineNumber = coLineNumber
    this.orderNumber = orderNumber
    this.skuCode = skuCode
    this.deliveryAddress = deliveryAddress
    this.orderQuantity = orderQuantity
    this.color = color
    this.size = size
    this.destination = destination
    this.uom = uom
    this.status = status
    this.discount = discount
    this.salePrice = salePrice
    this.coPercentage = coPercentage
    this.deliveryDate = deliveryDate
    this.exfDate = exfDate
    this.colorId = colorId
    this.sizeId = sizeId
    this.destinationId = destinationId
    this.uomId = uomId
    this.coId = coId

   

    }

}