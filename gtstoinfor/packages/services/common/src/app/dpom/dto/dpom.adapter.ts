import { DpomEntity } from "../entites/dpom.entity";
import { DpomSaveDto } from "./dpom-save.dto";

export class DpomAdapter {

    public convertDtoToEntity(dto: DpomSaveDto): DpomEntity {
        const entity = new DpomEntity()

        entity.documentDate = dto.documentDate
        entity.purchaseOrderNumber = dto.purchaseOrderNumber
        entity.poLineItemNumber = dto.poLineItemNumber
        entity.scheduleLineItemNumber = dto.scheduleLineItemNumber
        entity.categoryCode = dto.categoryCode
        entity.categoryDesc = dto.categoryDesc
        entity.vendorCode = dto.vendorCode
        entity.gccFocusCode = dto.gccFocusCode
        entity.gccFocusDesc = dto.gccFocusDesc
        entity.genderAgeCode = dto.genderAgeCode
        entity.styleNumber = dto.styleNumber
        entity.productCode = dto.productCode
        entity.colorDesc = dto.colorDesc
        entity.destinationCountryCode = dto.destinationCountryCode
        entity.destinationCountry = dto.destinationCountry
        entity.plant = dto.plant
        entity.plantName = dto.plantName
        entity.tradingCoPoNumber = dto.tradingCoPoNumber
        entity.UPC = dto.UPC
        entity.directShipSONumber = dto.directShipSONumber
        entity.directShipSOItemNumber = dto.directShipSOItemNumber
        entity.customerPO = dto.customerPO
        entity.shipToCustomerNumber = dto.shipToCustomerNumber
        entity.shipToCustomerName = dto.shipToCustomerName
        entity.planningSeasonCode = dto.planningSeasonCode
        entity.planningSeasonYear = dto.planningSeasonYear
        entity.docTypeCode = dto.docTypeCode
        entity.docTypeDesc = dto.docTypeDesc
        entity.MRGAC = dto.MRGAC
        entity.OGAC = dto.OGAC
        entity.GAC = dto.GAC
        entity.originReceiptDate = dto.originReceiptDate
        entity.factoryDeliveryActDate = dto.factoryDeliveryActDate
        entity.GACReasonCode = dto.GACReasonCode
        entity.shippingType = dto.shippingType
        entity.planningPriorityCode = dto.planningPriorityCode
        entity.planningPriorityDesc = dto.planningPriorityDesc
        entity.launchCode = dto.launchCode
        entity.DPOMLineItemStatus = dto.DPOMLineItemStatus
        entity.modeOfTransportationCode = dto.modeOfTransportationCode
        entity.inCoTerms = dto.inCoTerms
        entity.inventorySegmentCode = dto.inventorySegmentCode
        entity.purchaseGroupCode = dto.purchaseGroupCode
        entity.purchaseGroupName = dto.purchaseGroupName
        entity.totalItemQty = dto.totalItemQty
        entity.originReceiptQty = dto.originReceiptQty
        entity.VASSize = dto.VASSize
        entity.itemVasText = dto.itemVasText
        entity.itemText = dto.itemText
        entity.grossPriceFOB = dto.grossPriceFOB
        entity.FOBCurrencyCode = dto.FOBCurrencyCode
        entity.netIncludingDisc = dto.netIncludingDisc
        entity.netIncludingDiscCurrencyCode = dto.netIncludingDiscCurrencyCode
        entity.trCoNetIncludingDisc = dto.trCoNetIncludingDisc
        entity.trCoNetIncludingDiscCurrencyCode = dto.trCoNetIncludingDiscCurrencyCode
        entity.shipToAddressLegalPO = dto.shipToAddressLegalPO
        entity.quantity = dto.quantity
        entity.price = dto.price
        entity.itemVas = dto.itemVas
        entity.shipToAddressDIA = dto.shipToAddressDIA
        entity.CABCode = dto.CABCode
        entity.item = dto.item
        entity.factory = dto.factory
        entity.customerOrder = dto.customerOrder
        entity.coFinalApprovalDate = dto.coFinalApprovalDate
        entity.planNo = dto.planNo
        entity.truckOutDate = dto.truckOutDate
        entity.actualShippedQty = dto.actualShippedQty
        entity.coPrice = dto.coPrice
        entity.shipToAddress = dto.shipToAddress
        entity.paymentTerm = dto.paymentTerm
        entity.styleDesc = dto.styleDesc
        entity.fabricContent = dto.fabricContent
        entity.fabricSource = dto.fabricSource
        entity.commission = dto.commission
        entity.PCD = dto.PCD
        entity.hanger = dto.hanger
        entity.poAndLine = dto.poAndLine
        entity.lastModifiedDate = dto.lastModifiedDate
        entity.leadTime = dto.leadTime
        entity.recordDate = dto.recordDate
        entity.odVersion = dto.odVersion

        return entity
    }
}