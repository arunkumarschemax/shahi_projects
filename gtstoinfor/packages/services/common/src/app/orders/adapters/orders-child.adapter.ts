import { SaveOrderDto } from "../models/save-order-dto";
import { OrdersChildEntity } from "../entities/orders-child.entity";
import { OrdersEntity } from "../entities/orders.entity";

export class OrdersChildAdapter {

    public convertDtoToEntity(dto: SaveOrderDto , id :number, month:number): OrdersChildEntity {
        const entity = new OrdersChildEntity()
        entity.year = dto.year;
        entity.planningSeason = dto.planningSeason
        entity.season = dto.season
        entity.itemBrand = dto.itemBrand
        entity.businessUnit = dto.businessUnit
        entity.itemCode = dto.itemCode
        entity.itemName = dto.itemName
        entity.mainSampleCode = dto.mainSampleCode
        entity.mainSampleName = dto.mainSampleName
        entity.supplierRMCode = dto.supplierRMCode
        entity.supplierRMName = dto.supplierRMName
        entity.vendorCode = dto.vendorCode
        entity.vendorName = dto.vendorName
        entity.managementFactoryCode = dto.managementFactoryCode
        entity.managementFactoryName = dto.managementFactoryName
        entity.branchFactoryCode = dto.branchFactoryCode
        entity.branchFactoryName = dto.branchFactoryName
        entity.rmSupplierCode = dto.rmSupplierCode
        entity.rmSupplierName = dto.rmSupplierName
        entity.sewingDifficulty = dto.sewingDifficulty
        entity.departmentCode = dto.departmentCode
        entity.departmentName = dto.departmentName
        entity.class1Code = dto.class1Code
        entity.Class1Name = dto.Class1Name
        entity.productionPlanTypeName = dto.productionPlanTypeName
        entity.monthWeekFlag = dto.monthWeekFlag
        entity.lastUpdateDate = dto.lastUpdateDate
        entity.requestedWhDate = dto.requestedWhDate
        entity.contractedDate = dto.contractedDate
        entity.transportMethodName = dto.transportMethodName
        entity.logisticsTypeName = dto.logisticsTypeName
        entity.orderQtyPcs = dto.orderQtyPcs
        entity.yarnOrderAcceptance = dto.yarnOrderAcceptance
        entity.yarnOrderRequestDate = dto.yarnOrderRequestDate
        entity.yarnOrderAnswerDate = dto.yarnOrderActualDate
        entity.yarnOrderActualDate = dto.yarnOrderActualDate
        entity.yarnOrderNO = dto.yarnOrderNO
        entity.yarnActualOrderQtyPcs = dto.yarnActualOrderQtyPcs
        entity.yarnUpdateDate = dto.yarnUpdateDate
        entity.fabricOrderAcceptance = dto.fabricOrderAcceptance
        entity.fabricOrderRequestDate = dto.fabricOrderRequestDate
        entity.fabricOrderAnswerDate = dto.fabricOrderAnswerDate
        entity.fabricOrderActualDate = dto.fabricOrderActualDate
        entity.fabricOrderNO = dto.fabricOrderNO
        entity.fabricActualOrderQtyPcs = dto.fabricActualOrderQtyPcs
        entity.fabricUpdateDate = dto.fabricUpdateDate
        entity.colorOrderAcceptance = dto.colorOrderAcceptance
        entity.colorOrderRequestDate = dto.colorOrderRequestDate
        entity.colorOrderAnswerDate = dto.colorOrderAnswerDate
        entity.colorOrderActualDate = dto.colorOrderActualDate
        entity.colorOrderNO = dto.colorOrderNO
        entity.colorActualOrderQtyPcs = dto.colorActualOrderQtyPcs
        entity.colorUpdateDate = dto.colorUpdateDate
        entity.trimOrderAcceptance = dto.trimOrderAcceptance
        entity.trimOrderRequestDate = dto.trimOrderRequestDate
        entity.trimOrderAnswerDate = dto.trimOrderAnswerDate
        entity.trimOrderActualDate = dto.trimOrderActualDate
        entity.trimOrderNO = dto.trimOrderNO
        entity.trimActualOrderQtyPcs = dto.trimActualOrderQtyPcs
        entity.trimUpdateDate = dto.trimUpdateDate
        entity.POOrderAcceptance = dto.POOrderAcceptance
        entity.POOrderRequestDate = dto.POOrderRequestDate
        entity.POOrderAnswerDate = dto.POOrderAnswerDate
        entity.POOrderActualDate = dto.POOrderActualDate
        entity.POOrderNO = dto.POOrderNO
        entity.POActualOrderQtyPcs = dto.POActualOrderQtyPcs
        entity.POUpdateDate = dto.POUpdateDate
        entity.orderQtyPcsOld = dto.orderQtyPcsOld
        entity.transportMethodNameOld = dto.transportMethodNameOld
        entity.logisticsTypeNameOld = dto.logisticsTypeNameOld
        entity.yarnOrderRequestDateOld = dto.yarnOrderRequestDateOld
        entity.fabricOrderRequestDateOld = dto.fabricOrderRequestDateOld
        entity.colorOrderRequestDateOld = dto.colorOrderRequestDateOld
        entity.trimOrderRequestDateOld = dto.trimOrderRequestDateOld
        entity.POOrderRequestDateOld = dto.POOrderRequestDateOld
        entity.status = dto.status
        entity.displayMonthWK = dto.displayMonthWK
        entity.displayMonthWKColumn = dto.displayMonthWKColumn
        entity.groupCd = dto.groupCd
        entity.showColorFlag = dto.showColorFlag
        entity.orderQtyCoeff = dto.orderQtyCoeff
        entity.factoryComment = dto.factoryComment
        entity.factoryCommentUpdateDate = dto.factoryCommentUpdateDate
        entity.FRFabricCode = dto.FRFabricCode
        entity.FRFabricName = dto.FRFabricName
        entity.Ph1FirstDiscriminationFlagOld = dto.Ph1FirstDiscriminationFlagOld
        entity.Ph1FirstDiscriminationFlag = dto.Ph1FirstDiscriminationFlag
        entity.orderTimingDisplayValueOld = dto.orderTimingDisplayValueOld
        entity.orderTimingDisplayValue = dto.orderTimingDisplayValue
        entity.expressLineFlagOld = dto.expressLineFlagOld
        entity.expressLineFlag = dto.expressLineFlag
        entity.manualLockFlagOld = dto.manualLockFlagOld
        entity.manualLockFlag = dto.manualLockFlag
        entity.Ph1FirstDiscriminationFlagNow = dto.Ph1FirstDiscriminationFlagNow
        entity.orderTimingDisplayValueNow = dto.orderTimingDisplayValueNow
        entity.expressLineFlagNow = dto.expressLineFlagNow
        entity.ManualLockFlagNow = dto.ManualLockFlagNow
        entity.requestedWhDateOld = dto.requestedWhDateOld
        entity.EXF = dto.EXF
        entity.colorRecommend = dto.colorRecommend
        entity.trimRecommend = dto.trimRecommend
        entity.PORecommend = dto.PORecommend
        entity.BD_EXF_DLSettingLTBeforeCal = dto.BD_EXF_DLSettingLTBeforeCal
        entity.PO_EXF_DLSettingLTBeforeCal = dto.PO_EXF_DLSettingLTBeforeCal
        entity.materialSupplierHolidayExcluding = dto.materialSupplierHolidayExcluding
        entity.sewingFTYHolidayExcluding = dto.sewingFTYHolidayExcluding
        entity.BD_EXF_DLSettingLT = dto.BD_EXF_DLSettingLT
        entity.PO_EXF_DLSettingLT = dto.PO_EXF_DLSettingLT
        entity.BD_EXFRegisteredLT = dto.BD_EXFRegisteredLT
        entity.PO_EXFRegisteredLT = dto.PO_EXFRegisteredLT
        entity.BD_EXFtotalAbnormalLT = dto.BD_EXFtotalAbnormalLT
        entity.PO_EXFtotalAbnormalLT = dto.PO_EXFtotalAbnormalLT
        entity.abnormalLTReasonBD1 = dto.abnormalLTReasonBD1
        entity.abnormalLTReasonBD2 = dto.abnormalLTReasonBD2
        entity.abnormalLTReasonBD3 = dto.abnormalLTReasonBD3
        entity.abnormalLTReasonBD4 = dto.abnormalLTReasonBD4
        entity.abnormalLTReasonBD5 = dto.abnormalLTReasonBD5
        entity.abnormalLTBD1 = dto.abnormalLTBD1
        entity.abnormalLTBD2 = dto.abnormalLTBD2
        entity.abnormalLTBD3 = dto.abnormalLTBD3
        entity.abnormalLTBD4 = dto.abnormalLTBD4
        entity.abnormalLTBD5 = dto.abnormalLTBD5
        entity.abnormalLTReasonPO1 = dto.abnormalLTReasonPO1
        entity.abnormalLTReasonPO2 = dto.abnormalLTReasonPO2
        entity.abnormalLTReasonPO3 = dto.abnormalLTReasonPO3
        entity.abnormalLTReasonPO4 = dto.abnormalLTReasonPO4
        entity.abnormalLTReasonPO5 = dto.abnormalLTReasonPO5
        entity.abnormalLTPO1 = dto.abnormalLTPO1
        entity.abnormalLTPO2 = dto.abnormalLTPO2
        entity.abnormalLTPO3 = dto.abnormalLTPO3
        entity.abnormalLTPO4 = dto.abnormalLTPO4
        entity.abnormalLTPO5 = dto.abnormalLTPO5
        entity.version = dto.version
        const ordersEntity = new OrdersEntity();
        ordersEntity.productionPlanId = dto.productionPlanId;
        entity.orders = ordersEntity;
        entity.fileId = id
        entity.month=month
        return entity
    }
}