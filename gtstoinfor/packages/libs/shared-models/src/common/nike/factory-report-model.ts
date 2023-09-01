import { FactoryReportSizeModel } from "./factory-repoort-factory-size-model";


export class FactoryReportModel {
    lastModifiedDate: string;
    item: string;
    factory: string;
    documentDate: string;
    purchaseOrderNumber: string;
    poLineItemNumber: number;
    poAndLine: string;
    DPOMLineItemStatus: string;
    styleNumber: string;
    productCode: string;
    colorDesc: string;
    customerOrder: string;
    coFinalApprovalDate: string;
    planNo: string;
    leadTime: string;
    categoryCode: string;
    categoryDesc: string;
    vendorCode: string;
    gccFocusCode: string;
    gccFocusDesc: string;
    genderAgeCode: string;
    genderAgeDesc: string;
    destinationCountryCode: string;
    destinationCountry: string;
    plant: string;
    plantName: string;
    tradingCoPoNumber: string;
    UPC: string;
    directShipSONumber: string;
    directShipSOItemNumber: string;
    customerPO: string;
    shipToCustomerNumber: string;
    shipToCustomerName: string;
    planningSeasonCode: string;
    planningSeasonYear: string;
    docTypeCode: string;
    docTypeDesc: string;
    MRGAC: string;
    OGAC: string;
    GAC: string;
    truckOutDate: string;
    originReceiptDate: string;
    factoryDeliveryActDate: string;
    GACReasonCode: string;
    GACReasonDesc: string;
    shippingType: string;
    planningPriorityCode: string;
    planningPriorityDesc: string;
    launchCode: string;
    modeOfTransportationCode: string;
    inCoTerms: string;
    inventorySegmentCode: string;
    purchaseGroupCode: string;
    purchaseGroupName: string;
    totalItemQty: string;
    actualShippedQty: string;
    VASSize: string;
    itemVasText: string;
    itemText: string;
    price:number;
    coPrice:number;
    PCD: string;
    shipToAddressLegalPO: string;
    shipToAddressDIA: string;
    CABCode: string;
    grossPriceFOB: string;
    netIncludingDisc: string;
    trCoNetIncludingDisc: string;
    displayName:string;
    sizeWiseData: FactoryReportSizeModel[];
    

    constructor(lastModifiedDate: string, item: string, factory: string, documentDate: string, purchaseOrderNumber: string, poLineItemNumber: number, poAndLine: string, DPOMLineItemStatus: string, styleNumber: string, productCode: string, colorDesc: string, customerOrder: string, coFinalApprovalDate: string, planNo: string, leadTime: string, categoryCode: string, categoryDesc: string, vendorCode: string, gccFocusCode: string, gccFocusDesc: string, genderAgeCode: string, genderAgeDesc: string, destinationCountryCode: string, destinationCountry: string, plant: string, plantName: string, tradingCoPoNumber: string, UPC: string, directShipSONumber: string, directShipSOItemNumber: string, customerPO: string, shipToCustomerNumber: string, shipToCustomerName: string, planningSeasonCode: string, planningSeasonYear: string, docTypeCode: string, docTypeDesc: string, MRGAC: string, OGAC: string, GAC: string, truckOutDate: string, originReceiptDate: string, factoryDeliveryActDate: string, GACReasonCode: string, GACReasonDesc: string, shippingType: string, planningPriorityCode: string, planningPriorityDesc: string, launchCode: string, modeOfTransportationCode: string, inCoTerms: string, inventorySegmentCode: string, purchaseGroupCode: string, purchaseGroupName: string, totalItemQty: string, actualShippedQty: string, VASSize: string, itemVasText: string, itemText: string,
        price:number,coPrice:number,PCD: string,shipToAddressLegalPO: string, shipToAddressDIA: string,CABCode: string,grossPriceFOB: string,netIncludingDisc: string, trCoNetIncludingDisc: string,displayName:string,sizeWiseData: FactoryReportSizeModel[]) {

        this.lastModifiedDate = lastModifiedDate;
        this.item = item
        this.factory = factory
        this.documentDate = documentDate
        this.purchaseOrderNumber = purchaseOrderNumber
        this.poLineItemNumber = poLineItemNumber
        this.poAndLine = poAndLine
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
        this.genderAgeDesc = genderAgeDesc
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
        this.truckOutDate = truckOutDate
        this.originReceiptDate = originReceiptDate
        this.factoryDeliveryActDate = factoryDeliveryActDate
        this.GACReasonCode = GACReasonCode
        this.GACReasonDesc = GACReasonDesc
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
        this.actualShippedQty = actualShippedQty
        this.VASSize = VASSize
        this.itemVasText = itemVasText
        this.itemText = itemText
        this.price = price
        this.coPrice = coPrice
        this.PCD = PCD
        this.shipToAddressLegalPO = shipToAddressLegalPO
       this.shipToAddressDIA=  shipToAddressDIA
       this.CABCode= CABCode
       this.grossPriceFOB = grossPriceFOB
       this.netIncludingDisc = netIncludingDisc
       this.trCoNetIncludingDisc=trCoNetIncludingDisc
       this.displayName = displayName
       this.sizeWiseData = sizeWiseData
    };
}