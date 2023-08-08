import { ApiProperty } from "@nestjs/swagger";

export class DpomSaveDto {
    @ApiProperty()
    documentDate: string;
    @ApiProperty()
    purchaseOrderNumber: string;
    @ApiProperty()
    poLineItemNumber: string;
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
    @ApiProperty()
    id?: number;

    constructor(documentDate: string, purchaseOrderNumber: string, poLineItemNumber: string, categoryCode: string, categoryDesc: string, vendorCode: string, gccFocusCode: string, gccFocusDesc: string, genderAgeCode: string, styleNumber: string, productCode: string, colorDesc: string, destinationCountryCode: string, destinationCountry: string, plant: string, plantName: string, tradingCoPoNumber: string, UPC: string, directShipSONumber: string, directShipSOItemNumber: string, customerPO: string, shipToCustomerNumber: string, shipToCustomerName: string, planningSeasonCode: string, planningSeasonYear: string, docTypeCode: string, docTypeDesc: string, MRGAC: string, OGAC: string, GAC: string, originReceiptDate: string, factoryDeliveryActDate: string, GACReasonCode: string, shippingType: string, planningPriorityCode: string, planningPriorityDesc: string, launchCode: string, DPOMLineItemStatus: string, modeOfTransportationCode: string, inCoTerms: string, inventorySegmentCode: string, purchaseGroupCode: string, purchaseGroupName: string, totalItemQty: string, originReceiptQty: string, VASSize: string, itemVasText: string, itemText: string, grossPriceFOB: string, FOBCurrencyCode: string, netIncludingDisc: string, netIncludingDiscCurrencyCode: string, trCoNetIncludingDisc: string, trCoNetIncludingDiscCurrencyCode: string, id?: number) {
        this.documentDate = documentDate
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poLineItemNumber = poLineItemNumber
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
        this.id = id;
    }
}
