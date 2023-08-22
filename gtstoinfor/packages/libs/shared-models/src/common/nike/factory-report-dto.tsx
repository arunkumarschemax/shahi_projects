

export class FactoryReportDto {

    lastModifiedDate: number;
    item: string;
    factory: number;
    documentDate: number;
    purchaseOrderNumber: number;
    poLineItemNumber: number;
    DPOMLineItemStatus: string;
    styleNumber: number;
    productCode: number;
    colorDesc: string;
    customerOrder: string;
    coFinalApprovalDate: number;
    planNo: number;
    leadTime: number;
    categoryCode: number;
    categoryDesc: string;
    vendorCode: number;
    gccFocusCode: number;
    gccFocusDesc: string;
    genderAgeCode: number;
    genderAgeDescription: string;
    destinationCountryCode: string;
    destinationCountry: string;
    plant: number;
    plantName: string;
    tradingCoPoNumber: number;
    UPC: string;
    salesOrderNumber: number;
    salesOrderItemNumber: number;
    customerPO: string;
    shipToCustomerNumber: number;
    shipToCustomerName: string;
    planningSeasonCode: number;
    planningSeasonYear: number;
    docTypeCode: string;
    docTypeDesc: string;
    MRGAC: number;
    OGAC: number;
    GAC: number;
    truckOutDate: number;
    originReceiptDate: number;
    factoryDeliveryActDate: number;
    GACReasonCode: number;
    GACReasonDescription: string;
    shippingType: string;
    planningPriorityCode: number;
    planningPriorityDesc: string;
    launchCode: number;
    modeOfTransportationCode: string;
    inCoTerms: string;
    inventorySegmentCode: number;
    purchaseGroupCode: number;
    purchaseGroupName: string;
    totalItemQty: number;
    grandTotal: number;
    actualShippedQty: string;
    VASSize: string;
    itemVasText: string;
    itemText: string;

    constructor(
        lastModifiedDate: number,
        item: string,
        factory: number,
        documentDate: number,
        purchaseOrderNumber: number,
        poLineItemNumber: number,
        DPOMLineItemStatus: string,
        styleNumber: number,
        productCode: number,
        colorDesc: string,
        customerOrder: string,
        coFinalApprovalDate: number,
        planNo: number,
        leadTime: number,
        categoryCode: number,
        categoryDesc: string,
        vendorCode: number,
        gccFocusCode: number,
        gccFocusDesc: string,
        genderAgeCode: number,
        genderAgeDescription: string,
        destinationCountryCode: string,
        destinationCountry: string,
        plant: number,
        plantName: string,
        tradingCoPoNumber: number,
        UPC: string,
        salesOrderNumber: number,
        salesOrderItemNumber: number,
        customerPO: string,
        shipToCustomerNumber: number,
        shipToCustomerName: string,
        planningSeasonCode: number,
        planningSeasonYear: number,
        docTypeCode: string,
        docTypeDesc: string,
        MRGAC: number,
        OGAC: number,
        GAC: number,
        truckOutDate: number,
        originReceiptDate: number,
        factoryDeliveryActDate: number,
        GACReasonCode: number,
        GACReasonDescription: string,
        shippingType: string,
        planningPriorityCode: number,
        planningPriorityDesc: string,
        launchCode: number,
        modeOfTransportationCode: string,
        inCoTerms: string,
        inventorySegmentCode: number,
        purchaseGroupCode: number,
        purchaseGroupName: string,
        totalItemQty: number,
        grandTotal: number,
        actualShippedQty: string,
        VASSize: string,
        itemVasText: string,
        itemText: string) {

        // this.productionPlanId = productionPlanId;
        this.lastModifiedDate = lastModifiedDate;
        this.item = item
        this.factory = factory
        this.documentDate = documentDate
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poLineItemNumber = poLineItemNumber
        this.DPOMLineItemStatus = DPOMLineItemStatus
        this.styleNumber = styleNumber
        this.productCode = productCode
        this.colorDesc = colorDesc
        this.customerOrder = customerOrder
        this.coFinalApprovalDate = coFinalApprovalDate
        this.planNo = planNo
        this.leadTime = leadTime
        this.categoryCode = categoryCode
        this.categoryDesc = categoryDesc
        this.vendorCode = vendorCode
        this.gccFocusCode = gccFocusCode
        this.gccFocusDesc = gccFocusDesc
        this.genderAgeCode = genderAgeCode
        this.genderAgeDescription = genderAgeDescription
        this.destinationCountryCode = destinationCountryCode
        this.destinationCountry = destinationCountry
        this.plant = plant
        this.plantName = plantName
        this.tradingCoPoNumber = tradingCoPoNumber
        this.UPC = UPC
        this.salesOrderNumber = salesOrderNumber
        this.salesOrderItemNumber = salesOrderItemNumber
        this.customerPO = customerPO
        this.shipToCustomerNumber = shipToCustomerNumber
        this.shipToCustomerName = shipToCustomerName
        this.planningSeasonCode = planningSeasonCode
        this.planningSeasonYear = planningSeasonYear
        this.docTypeCode = docTypeCode
        this.docTypeDesc = docTypeDesc
        this.MRGAC = MRGAC
        this.OGAC = OGAC
        this.GAC = GAC
        this.truckOutDate = truckOutDate
        this.originReceiptDate = originReceiptDate
        this.factoryDeliveryActDate = factoryDeliveryActDate
        this.GACReasonCode = GACReasonCode
        this.GACReasonDescription = GACReasonDescription
        this.shippingType = shippingType
        this.planningPriorityCode = planningPriorityCode
        this.planningPriorityDesc = planningPriorityDesc
        this.launchCode = launchCode
        this.modeOfTransportationCode = modeOfTransportationCode
        this.inCoTerms = inCoTerms
        this.inventorySegmentCode = inventorySegmentCode
        this.purchaseGroupCode = purchaseGroupCode
        this.purchaseGroupName = purchaseGroupName
        this.totalItemQty = totalItemQty
        this.grandTotal = grandTotal
        this.actualShippedQty = actualShippedQty
        this.VASSize = VASSize
        this.itemVasText = itemVasText
        this.itemText = itemText
        
    }

}