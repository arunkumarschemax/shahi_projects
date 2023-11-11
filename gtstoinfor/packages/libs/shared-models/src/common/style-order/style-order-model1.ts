import { CustomerOrderStatusEnum } from "../../enum";
import { StyleOrderCoLineModel } from "./style-order-coline-model";


export class StyleOrderModel1{
    coId: number;
    orderNumber:string;
    itemCode: string;
    orderDate : any;
    buyerPoNumber: string; 
    shipmentType: string;
    buyerStyle : string;
    agent : number;
    buyerAddress : number;
    instoreDate: Date;
    salePrice: number;
    priceQuantity: number;
    discountPercent: number;
    discountAmount: number;
    status: CustomerOrderStatusEnum;
    remarks: string;
    merchandiser:number;
    planner:number;
    itemSalePriceQty:number;
    fgItemId:number;
    warehouseId: number;
    facilityId: number;
    styleId: number;
    packageTermsId: number;
    deliveryMethodId: number;
    deliverytermId: number;
    currencyId: number;
    paymentMethodId: number;
    paymentTermId: number;
    styleOrderColine: StyleOrderCoLineModel[];
    buyerId: number;
    coTypeId?: number;
    quantityUomId?: number;
    itemName?: string;
    buyerCode?: string;
    buyerName?: string;
    factoryName?: string;
    warehouseName?: string;
    agentName?: string;
    agentCode?: string;
    packageTermsName?: string;
    deliveryMethod?: string;
    deliveryTermsName?: string;
    currencyName?: string;
    paymentMethod?: string;
    paymentTermsName?: string;
    merchandiserName?: string;
    merchandiserCode?: string;
    plannerName?: string;
    plannerCode?: string;
    uomId?: number;
    uom?: string;
    coType?: string;


    constructor( coId: number,
        orderNumber:string,
        itemCode: string,
        orderDate : any,
        buyerPoNumber: string, 
        shipmentType: string,
        buyerStyle : string,
        agent : number,
        buyerAddress : number,
        instoreDate: Date,
        salePrice: number,
        priceQuantity: number,
        discountPercent: number,
        discountAmount: number,
        status: CustomerOrderStatusEnum,
        remarks: string,
        merchandiser:number,
        planner:number,
        itemSalePriceQty:number,
        fgItemId:number,
        warehouseId: number,
        facilityId: number,
        styleId: number,
        packageTermsId: number,
        deliveryMethodId: number,
        deliverytermId: number,
        currencyId: number,
        paymentMethodId: number,
        paymentTermId: number,
        styleOrderColine: StyleOrderCoLineModel[],
        buyerId: number,
        coTypeId?: number,
        quantityUomId?: number,
        itemName?: string,
        buyerCode?: string,
        buyerName?: string,
        factoryName?: string,
        warehouseName?: string,
        agentName?: string,
        agentCode?: string,
        packageTermsName?: string,
        deliveryMethod?: string,
        deliveryTermsName?: string,
        currencyName?: string,
        paymentMethod?: string,
        paymentTermsName?: string,
        merchandiserName?: string,
        merchandiserCode?: string,
        plannerName?: string,
        plannerCode?: string,
        uomId?: number,
        uom?: string,
        coType?: string,){
    this.coId = coId
    this.orderNumber = orderNumber
    this.itemCode = itemCode
    this.orderDate = orderDate
    this.buyerPoNumber = buyerPoNumber
    this.shipmentType  = shipmentType
    this.buyerStyle  = buyerStyle
    this.agent  = agent
    this.buyerAddress = buyerAddress
    this.instoreDate = instoreDate
    this.salePrice = salePrice
    this.priceQuantity = priceQuantity
    this.discountPercent = discountPercent
    this.discountAmount = discountAmount
    this.status = status
    this.remarks = remarks
    this.merchandiser = merchandiser
    this.planner = planner
    this.itemSalePriceQty = itemSalePriceQty
    this.fgItemId = fgItemId
    this.warehouseId = warehouseId
    this.facilityId = facilityId
    this.styleId = styleId
    this.packageTermsId = packageTermsId
    this.deliveryMethodId = deliveryMethodId
    this.deliverytermId = deliverytermId
    this.currencyId = currencyId
    this.paymentMethodId = paymentMethodId
    this.paymentTermId = paymentTermId
    this.styleOrderColine = styleOrderColine
    this.buyerId = buyerId
    this.coTypeId = coTypeId
    this.quantityUomId = quantityUomId
    this.itemName = itemName
    this.buyerCode = buyerCode
    this.buyerName = buyerName
    this.factoryName = factoryName
    this.warehouseName = warehouseName
    this.agentName = agentName
    this.agentCode = agentCode
    this.packageTermsName = packageTermsName
    this.deliveryMethod = deliveryMethod
    this.deliveryTermsName = deliveryTermsName
    this.currencyName = currencyName
    this.paymentMethod = paymentMethod
    this.paymentTermsName = paymentTermsName
    this.merchandiserCode = merchandiserCode
    this.merchandiserName = merchandiserName
    this.plannerCode = plannerCode
    this.plannerName = plannerName
    this.uomId = uomId
    this.uom = uom
    this.coTypeId = coTypeId
    this.coType = coType
   
    }
}