import { CustomerOrderStatusEnum } from "../../enum";
import { StyleOrderItemsReq } from "./style-order-items-req";

export class StyleOrderReq{
    itemCode: string;
    orderDate : any;
    buyerPoNumber: string;
    shipmentType: string;
    buyerStyle : string;
    agent : string;
    buyerAddress : string;
    exFactoryDate: Date;
    deliveryDate: Date;
    instoreDate: Date;
    salePrice: number;
    priceQuantity: number;
    discountPercent: number;
    discountAmount: number;
    status: CustomerOrderStatusEnum;
    remarks: string;
    itemId: number;
    warehouseId: number;
    facilityId: number;
    styleId: number;
    packageTermsId: number;
    deliveryMethodId: number;
    deliverytermId: number;
    currencyId: number;
    paymentMethodId: number;
    paymentTermId: number;
    styleOrderItems: StyleOrderItemsReq[];
    buyerId: number;
    createdUser: string;
    styleOrderId?: number;
    coNumber?: string;

    constructor(itemCode: string,orderDate : any,buyerPoNumber: string,shipmentType: string,buyerStyle : string,agent : string,buyerAddress : string,exFactoryDate: Date,deliveryDate: Date,instoreDate: Date,salePrice: number,priceQuantity: number,discountPercent: number,discountAmount: number,status: CustomerOrderStatusEnum,remarks: string,itemId: number,warehouseId: number,facilityId: number,styleId: number,packageTermsId: number,deliveryMethodId: number,deliverytermId: number,currencyId: number,paymentMethodId: number,paymentTermId: number,    styleOrderItems: StyleOrderItemsReq[],buyerId:number,createdUser: string,styleOrderId?: number,coNumber?: string){
    this.itemCode = itemCode
    this.orderDate = orderDate
    this.buyerPoNumber = buyerPoNumber
    this.shipmentType = shipmentType
    this.buyerStyle  = buyerStyle
    this.agent  = agent
    this.buyerAddress  = buyerAddress
    this.exFactoryDate = exFactoryDate
    this.deliveryDate = deliveryDate
    this.instoreDate = instoreDate
    this.salePrice = salePrice
    this.priceQuantity = priceQuantity
    this.discountPercent = discountPercent
    this.discountAmount =discountAmount
    this.status = status
    this.remarks = remarks
    this.itemId = itemId
    this.warehouseId = warehouseId
    this.facilityId = facilityId
    this.styleId = styleId
    this.packageTermsId = packageTermsId
    this.deliveryMethodId = deliveryMethodId
    this.deliverytermId = deliverytermId
    this.currencyId = currencyId
    this.paymentMethodId = paymentMethodId
    this.paymentTermId = paymentTermId
    this.styleOrderItems = styleOrderItems
    this.buyerId = buyerId
    this.createdUser = createdUser
    this.styleOrderId = styleOrderId
    this.coNumber = coNumber
    }
}