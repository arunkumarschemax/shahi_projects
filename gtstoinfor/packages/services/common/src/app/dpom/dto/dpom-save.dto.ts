import { ApiProperty } from "@nestjs/swagger";

export class DpomSaveDto {
    // DPOM API Data
    @ApiProperty()
    documentDate: string;
    @ApiProperty()
    purchaseOrderNumber: string;
    @ApiProperty()
    poLineItemNumber: number;
    @ApiProperty()
    scheduleLineItemNumber: string;
    @ApiProperty()
    categoryCode: string;
    @ApiProperty()
    categoryDesc: string;
    @ApiProperty()
    vendorCode: string;
    @ApiProperty()
    gccFocusCode: string;
    @ApiProperty()
    gccFocusDesc: string;
    @ApiProperty()
    genderAgeCode: string;
    @ApiProperty()
    styleNumber: string;
    @ApiProperty()
    productCode: string;
    @ApiProperty()
    colorDesc: string;
    @ApiProperty()
    destinationCountryCode: string;
    @ApiProperty()
    destinationCountry: string;
    @ApiProperty()
    plant: string;
    @ApiProperty()
    plantName: string;
    @ApiProperty()
    tradingCoPoNumber: string;
    @ApiProperty()
    UPC: string;
    @ApiProperty()
    directShipSONumber: string;
    @ApiProperty()
    directShipSOItemNumber: string;
    @ApiProperty()
    customerPO: string;
    @ApiProperty()
    shipToCustomerNumber: string;
    @ApiProperty()
    shipToCustomerName: string;
    @ApiProperty()
    planningSeasonCode: string;
    @ApiProperty()
    planningSeasonYear: string;
    @ApiProperty()
    docTypeCode: string;
    @ApiProperty()
    docTypeDesc: string;
    @ApiProperty()
    MRGAC: string;
    @ApiProperty()
    OGAC: string;
    @ApiProperty()
    GAC: string;
    @ApiProperty()
    originReceiptDate: string;
    @ApiProperty()
    factoryDeliveryActDate: string;
    @ApiProperty()
    GACReasonCode: string;
    @ApiProperty()
    shippingType: string;
    @ApiProperty()
    planningPriorityCode: string;
    @ApiProperty()
    planningPriorityDesc: string;
    @ApiProperty()
    launchCode: string;
    @ApiProperty()
    DPOMLineItemStatus: string;
    @ApiProperty()
    modeOfTransportationCode: string;
    @ApiProperty()
    inCoTerms: string;
    @ApiProperty()
    inventorySegmentCode: string;
    @ApiProperty()
    purchaseGroupCode: string;
    @ApiProperty()
    purchaseGroupName: string;
    @ApiProperty()
    totalItemQty: string;
    @ApiProperty()
    originReceiptQty: string;
    @ApiProperty()
    VASSize: string;
    @ApiProperty()
    itemVasText: string;
    @ApiProperty()
    itemText: string;
    @ApiProperty()
    grossPriceFOB: string;
    @ApiProperty()
    FOBCurrencyCode: string;
    @ApiProperty()
    netIncludingDisc: string;
    @ApiProperty()
    netIncludingDiscCurrencyCode: string;
    @ApiProperty()
    trCoNetIncludingDisc: string;
    @ApiProperty()
    trCoNetIncludingDiscCurrencyCode: string;

    //PDF Data
    @ApiProperty()
    shipToAddressLegalPO: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    itemVas: string;
    @ApiProperty()
    shipToAddressDIA: string;
    @ApiProperty()
    CABCode: string;

    // CRM Data
    @ApiProperty()
    item: string;
    @ApiProperty()
    factory: string;
    @ApiProperty()
    customerOrder: string;
    @ApiProperty()
    coFinalApprovalDate: string;
    @ApiProperty()
    planNo: string;
    @ApiProperty()
    truckOutDate: string;
    @ApiProperty()
    actualShippedQty: string;
    @ApiProperty()
    coPrice: string;
    @ApiProperty()
    shipToAddress: string;
    @ApiProperty()
    paymentTerm: string;
    @ApiProperty()
    styleDesc: string;
    @ApiProperty()
    fabricContent: string;
    @ApiProperty()
    fabricSource: string;
    @ApiProperty()
    commission: string;
    @ApiProperty()
    PCD: string;

    //Auto Populate
    @ApiProperty()
    hanger: string;
    @ApiProperty()
    poAndLine: string;
    @ApiProperty()
    lastModifiedDate: string;
    @ApiProperty()
    leadTime: string;
    @ApiProperty()
    recordDate: string;
    @ApiProperty()
    userName?: string;
    @ApiProperty()
    odVersion?: number;
    @ApiProperty()
    id?: number;

    constructor(documentDate: string, purchaseOrderNumber: string, poLineItemNumber: number, scheduleLineItemNumber: string, categoryCode: string, categoryDesc: string, vendorCode: string, gccFocusCode: string, gccFocusDesc: string, genderAgeCode: string, styleNumber: string, productCode: string, colorDesc: string, destinationCountryCode: string, destinationCountry: string, plant: string, plantName: string, tradingCoPoNumber: string, UPC: string, directShipSONumber: string, directShipSOItemNumber: string, customerPO: string, shipToCustomerNumber: string, shipToCustomerName: string, planningSeasonCode: string, planningSeasonYear: string, docTypeCode: string, docTypeDesc: string, MRGAC: string, OGAC: string, GAC: string, originReceiptDate: string, factoryDeliveryActDate: string, GACReasonCode: string, shippingType: string, planningPriorityCode: string, planningPriorityDesc: string, launchCode: string, DPOMLineItemStatus: string, modeOfTransportationCode: string, inCoTerms: string, inventorySegmentCode: string, purchaseGroupCode: string, purchaseGroupName: string, totalItemQty: string, originReceiptQty: string, VASSize: string, itemVasText: string, itemText: string, grossPriceFOB: string, FOBCurrencyCode: string, netIncludingDisc: string, netIncludingDiscCurrencyCode: string, trCoNetIncludingDisc: string, trCoNetIncludingDiscCurrencyCode: string, shipToAddressLegalPO: string, quantity: number, price: number, itemVas: string, shipToAddressDIA: string, CABCode: string, item: string, factory: string, customerOrder: string, coFinalApprovalDate: string, planNo: string, truckOutDate: string, actualShippedQty: string, coPrice: string, shipToAddress: string, paymentTerm: string, styleDesc: string, fabricContent: string, fabricSource: string, commission: string, PCD: string, hanger: string, poAndLine: string, lastModifiedDate: string, leadTime: string, recordDate: string, userName?: string, odVersion?: number, id?: number
    ) {
        this.documentDate = documentDate
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poLineItemNumber = poLineItemNumber
        this.scheduleLineItemNumber = scheduleLineItemNumber
        this.categoryCode = categoryCode
        this.categoryDesc = categoryDesc
        this.vendorCode = vendorCode
        this.gccFocusCode = gccFocusCode
        this.gccFocusDesc = gccFocusDesc
        this.genderAgeCode = genderAgeCode
        this.styleNumber = styleNumber
        this.productCode = productCode
        this.colorDesc = colorDesc
        this.destinationCountryCode = destinationCountryCode
        this.destinationCountry = destinationCountry
        this.plant = plant
        this.plantName = plantName
        this.tradingCoPoNumber = tradingCoPoNumber
        this.UPC = UPC
        this.directShipSONumber = directShipSONumber
        this.directShipSOItemNumber = directShipSOItemNumber
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
        this.originReceiptDate = originReceiptDate
        this.factoryDeliveryActDate = factoryDeliveryActDate
        this.GACReasonCode = GACReasonCode
        this.shippingType = shippingType
        this.planningPriorityCode = planningPriorityCode
        this.planningPriorityDesc = planningPriorityDesc
        this.launchCode = launchCode
        this.DPOMLineItemStatus = DPOMLineItemStatus
        this.modeOfTransportationCode = modeOfTransportationCode
        this.inCoTerms = inCoTerms
        this.inventorySegmentCode = inventorySegmentCode
        this.purchaseGroupCode = purchaseGroupCode
        this.purchaseGroupName = purchaseGroupName
        this.totalItemQty = totalItemQty
        this.originReceiptQty = originReceiptQty
        this.VASSize = VASSize
        this.itemVasText = itemVasText
        this.itemText = itemText
        this.grossPriceFOB = grossPriceFOB
        this.FOBCurrencyCode = FOBCurrencyCode
        this.netIncludingDisc = netIncludingDisc
        this.netIncludingDiscCurrencyCode = netIncludingDiscCurrencyCode
        this.trCoNetIncludingDisc = trCoNetIncludingDisc
        this.trCoNetIncludingDiscCurrencyCode = trCoNetIncludingDiscCurrencyCode
        this.shipToAddressLegalPO = shipToAddressLegalPO
        this.quantity = quantity
        this.price = price
        this.itemVas = itemVas
        this.shipToAddressDIA = shipToAddressDIA
        this.CABCode = CABCode
        this.item = item
        this.factory = factory
        this.customerOrder = customerOrder
        this.coFinalApprovalDate = coFinalApprovalDate
        this.planNo = planNo
        this.truckOutDate = truckOutDate
        this.actualShippedQty = actualShippedQty
        this.coPrice = coPrice
        this.shipToAddress = shipToAddress
        this.paymentTerm = paymentTerm
        this.styleDesc = styleDesc
        this.fabricContent = fabricContent
        this.fabricSource = fabricSource
        this.commission = commission
        this.PCD = PCD
        this.hanger = hanger
        this.poAndLine = poAndLine
        this.lastModifiedDate = lastModifiedDate
        this.leadTime = leadTime
        this.recordDate = recordDate
        this.userName = userName
        this.odVersion = odVersion
        this.id = id;
    }
}
