export class COLineRequest{
    itemNumber : string;
    orderNumber:string;
    colorCode:string;
    color: string;
    sizeCode:string;
    size: string;
    itemCode:string;
    item:string;
    destination:string;
    company_CONO : number;
    temporaryOrderNumber_ORNO : string;
    itemNumber_ITNO : string;
    orderedQuantity_ORQT : string;
    warehouse_WHLO : string;
    requestedDeliveryDate_DWDT : string;
    jointDeliveryDate_JDCD: string;
    customersOrderNumber_CUPO :  string;
    salesPrice_SAPR : number;
    discountAmount1_DIA1 : number;
    discountAmount2_DIA2 : number;
    discountAmount3_DIA3 : number;
    discountAmount4_DIA4 : number;
    discountAmount5_DIA5 : number;
    discountAmount6_DIA6 : number;
    deliverySpecification_DLSP: string;
    deliverySpecificationText_DLSX : string;
    oldCFIN_CFXX : number;
    simulationsNumber_ECVS : number;
    alternateUM_ALUN: string;
    confirmedDateOfDelivery_CODT : string;
    itemDescription_ITDS: string;
    discountPercent1_DIP1: number;
    discountPercent2_DIP2: number;
    discountPercent3_DIP3: number;
    discountPercent4_DIP4: number;
    discountPercent5_DIP5: number;
    discountPercent6_DIP6: number;
    aliasQualifier_ALWT: number;
    aliasQualifier_ALWQ: number;
    blanketAgreementNumber_AGNO : string;
    container_CAMU : string;
    projectNumber_PROJ: string;
    projectElement_ELON: string;
    customerOrderNumber_CUOR : string;
    customersPackagingIdentity_CUPA :string;
    requestedDeliveryTime_DWHM: number;
    standardQuantity_D1QT: number;
    packaging_PACT: string;
    aliasNumber_POPN: string;
    salesPriceQuantity_SACD: number;
    saledPriceUOM_SPUN : string;
    packagingTerms_TEPA : string;
    EDIFACTPrice_EDFP : number;
    requestedDeliveryDate_DWDZ : number;
    requestedDeliveryTime_DWHZ : number;
    confirmedDeliveryTime_COHM : number;
    confirmedDeliveryDate_CODZ : string;
    confirmedDeliveryTime_COHZ : number;
    mainProduct_HDPR : string;
    addressNumber_ADID : string;
    lineSuffix_CUSX : number;
    statusDiscount_DICI : number;
    trimOrderId?: number;
    constructor(itemNumber : string,orderNumber:string,colorCode:string,color:string,sizeCode:string,size:string,itemCode:string,item:string,destination:string,company_CONO : number,temporaryOrderNumber_ORNO : string,itemNumber_ITNO : string,orderedQuantity_ORQT : string,warehouse_WHLO : string,requestedDeliveryDate_DWDT : string,jointDeliveryDate_JDCD: string,customersOrderNumber_CUPO :  string,salesPrice_SAPR : number,discountAmount1_DIA1 : number,discountAmount2_DIA2 : number,discountAmount3_DIA3 : number,discountAmount4_DIA4 : number,discountAmount5_DIA5 : number,discountAmount6_DIA6 : number,deliverySpecification_DLSP: string,deliverySpecificationText_DLSX : string,oldCFIN_CFXX : number,simulationsNumber_ECVS : number,alternateUM_ALUN: string,confirmedDateOfDelivery_CODT : string,itemDescription_ITDS: string,discountPercent1_DIP1: number,discountPercent2_DIP2: number,discountPercent3_DIP3: number,discountPercent4_DIP4: number,discountPercent5_DIP5: number,discountPercent6_DIP6: number,aliasQualifier_ALWT: number,aliasQualifier_ALWQ: number,blanketAgreementNumber_AGNO : string,container_CAMU : string,projectNumber_PROJ: string,projectElement_ELON: string,customerOrderNumber_CUOR : string,customersPackagingIdentity_CUPA :string,requestedDeliveryTime_DWHM: number,standardQuantity_D1QT: number,packaging_PACT: string,aliasNumber_POPN: string,salesPriceQuantity_SACD: number,saledPriceUOM_SPUN : string,packagingTerms_TEPA : string,EDIFACTPrice_EDFP : number,requestedDeliveryDate_DWDZ : number,requestedDeliveryTime_DWHZ : number,confirmedDeliveryTime_COHM : number,confirmedDeliveryDate_CODZ : string,confirmedDeliveryTime_COHZ : number,mainProduct_HDPR : string,addressNumber_ADID : string,lineSuffix_CUSX : number,statusDiscount_DICI : number,trimOrderId?: number
    ){
    this.itemNumber  = itemNumber; 
    this.orderNumber = orderNumber;
    this.colorCode = colorCode;
    this.color = color;
    this.sizeCode = sizeCode;
    this.size = size;
    this.itemCode = itemCode;
    this.item = item;
    this.destination = destination;
    this.company_CONO = company_CONO
    this.temporaryOrderNumber_ORNO = temporaryOrderNumber_ORNO
    this.itemNumber_ITNO = itemNumber_ITNO
    this.orderedQuantity_ORQT = orderedQuantity_ORQT
    this.warehouse_WHLO = warehouse_WHLO
    this.requestedDeliveryDate_DWDT = requestedDeliveryDate_DWDT
    this.jointDeliveryDate_JDCD= jointDeliveryDate_JDCD
    this.customersOrderNumber_CUPO = customersOrderNumber_CUPO
    this.salesPrice_SAPR = salesPrice_SAPR
    this.discountAmount1_DIA1 = discountAmount1_DIA1
    this.discountAmount2_DIA2 = discountAmount2_DIA2
    this.discountAmount3_DIA3 = discountAmount3_DIA3
    this.discountAmount4_DIA4 = discountAmount4_DIA4
    this.discountAmount5_DIA5 = discountAmount5_DIA5
    this.discountAmount6_DIA6 = discountAmount6_DIA6
    this.deliverySpecification_DLSP= deliverySpecification_DLSP
    this.deliverySpecificationText_DLSX = deliverySpecificationText_DLSX
    this.oldCFIN_CFXX = oldCFIN_CFXX
    this.simulationsNumber_ECVS = simulationsNumber_ECVS
    this.alternateUM_ALUN= alternateUM_ALUN
    this.confirmedDateOfDelivery_CODT = confirmedDateOfDelivery_CODT
    this.itemDescription_ITDS= itemDescription_ITDS
    this.discountPercent1_DIP1= discountPercent1_DIP1
    this.discountPercent2_DIP2= discountPercent2_DIP2
    this.discountPercent3_DIP3= discountPercent3_DIP3
    this.discountPercent4_DIP4= discountPercent4_DIP4
    this.discountPercent5_DIP5= discountPercent5_DIP5
    this.discountPercent6_DIP6= discountPercent6_DIP6
    this.aliasQualifier_ALWT= aliasQualifier_ALWT
    this.aliasQualifier_ALWQ=aliasQualifier_ALWQ
    this.blanketAgreementNumber_AGNO = blanketAgreementNumber_AGNO
    this.container_CAMU = container_CAMU
    this.projectNumber_PROJ= projectNumber_PROJ
    this.projectElement_ELON= projectElement_ELON
    this.customerOrderNumber_CUOR = customerOrderNumber_CUOR
    this.customersPackagingIdentity_CUPA= customersPackagingIdentity_CUPA
    this.requestedDeliveryTime_DWHM= requestedDeliveryTime_DWHM
    this.standardQuantity_D1QT= standardQuantity_D1QT
    this.packaging_PACT= packaging_PACT
    this.aliasNumber_POPN= aliasNumber_POPN
    this.salesPriceQuantity_SACD= salesPriceQuantity_SACD
    this.saledPriceUOM_SPUN = saledPriceUOM_SPUN
    this.packagingTerms_TEPA = packagingTerms_TEPA
    this.EDIFACTPrice_EDFP = EDIFACTPrice_EDFP
    this.requestedDeliveryDate_DWDZ = requestedDeliveryDate_DWDZ
    this.requestedDeliveryTime_DWHZ = requestedDeliveryTime_DWHZ
    this.confirmedDeliveryTime_COHM = confirmedDeliveryTime_COHM
    this.confirmedDeliveryDate_CODZ = confirmedDeliveryDate_CODZ
    this.confirmedDeliveryTime_COHZ = confirmedDeliveryTime_COHZ
    this.mainProduct_HDPR = mainProduct_HDPR
    this.addressNumber_ADID = addressNumber_ADID
    this.lineSuffix_CUSX = lineSuffix_CUSX
    this.statusDiscount_DICI = statusDiscount_DICI
    this.trimOrderId = trimOrderId
    }

}