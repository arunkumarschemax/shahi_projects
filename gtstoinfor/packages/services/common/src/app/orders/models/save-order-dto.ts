import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {

    @ApiProperty()
    productionPlanId: string
    @ApiProperty()
    year: string;
    @ApiProperty()
    planningSeason: string;
    @ApiProperty()
    season: string;
    @ApiProperty()
    itemBrand: string;
    @ApiProperty()
    businessUnit: string;
    @ApiProperty()
    itemCode: string;
    @ApiProperty()
    itemName: string;
    @ApiProperty()
    mainSampleCode: string;
    @ApiProperty()
    mainSampleName: string;
    @ApiProperty()
    supplierRMCode: string;
    @ApiProperty()
    supplierRMName: string;
    @ApiProperty()
    vendorCode: string;
    @ApiProperty()
    vendorName: string;
    @ApiProperty()
    managementFactoryCode: string;
    @ApiProperty()
    managementFactoryName: string;
    @ApiProperty()
    branchFactoryCode: string;
    @ApiProperty()
    branchFactoryName: string;
    @ApiProperty()
    rmSupplierCode: string;
    @ApiProperty()
    rmSupplierName: string;
    @ApiProperty()
    sewingDifficulty: number;
    @ApiProperty()
    departmentCode: string;
    @ApiProperty()
    departmentName: string;
    @ApiProperty()
    class1Code: string;
    @ApiProperty()
    Class1Name: string;
    @ApiProperty()
    productionPlanTypeName: string;
    @ApiProperty()
    monthWeekFlag: boolean;
    @ApiProperty()
    lastUpdateDate: string;
    @ApiProperty()
    requestedWhDate: string;
    @ApiProperty()
    contractedDate: string;
    @ApiProperty()
    transportMethodName: string;
    @ApiProperty()
    logisticsTypeName: string;
    @ApiProperty()
    orderQtyPcs: number;
    @ApiProperty()
    yarnOrderAcceptance: string;
    @ApiProperty()
    yarnOrderRequestDate: string;
    @ApiProperty()
    yarnOrderAnswerDate: string;
    @ApiProperty()
    yarnOrderActualDate: string;
    @ApiProperty()
    yarnOrderNO: string;
    @ApiProperty()
    yarnActualOrderQtyPcs: number;
    @ApiProperty()
    yarnUpdateDate: string;
    @ApiProperty()
    fabricOrderAcceptance: string;
    @ApiProperty()
    fabricOrderRequestDate: string;
    @ApiProperty()
    fabricOrderAnswerDate: string;
    @ApiProperty()
    fabricOrderActualDate: string;
    @ApiProperty()
    fabricOrderNO: string;
    @ApiProperty()
    fabricActualOrderQtyPcs: number;
    @ApiProperty()
    fabricUpdateDate: string;
    @ApiProperty()
    colorOrderAcceptance: string;
    @ApiProperty()
    colorOrderRequestDate: string;
    @ApiProperty()
    colorOrderAnswerDate: string;
    @ApiProperty()
    colorOrderActualDate: string;
    @ApiProperty()
    colorOrderNO: string;
    @ApiProperty()
    colorActualOrderQtyPcs: number;
    @ApiProperty()
    colorUpdateDate: string;
    @ApiProperty()
    trimOrderAcceptance: string;
    @ApiProperty()
    trimOrderRequestDate: string;
    @ApiProperty()
    trimOrderAnswerDate: string;
    @ApiProperty()
    trimOrderActualDate: string;
    @ApiProperty()
    trimOrderNO: string;
    @ApiProperty()
    trimActualOrderQtyPcs: number;
    @ApiProperty()
    trimUpdateDate: string;
    @ApiProperty()
    POOrderAcceptance: string;
    @ApiProperty()
    POOrderRequestDate: string;
    @ApiProperty()
    POOrderAnswerDate: string;
    @ApiProperty()
    POOrderActualDate: string;
    @ApiProperty()
    POOrderNO: string;
    @ApiProperty()
    POActualOrderQtyPcs: number;
    @ApiProperty()
    POUpdateDate: string;
    @ApiProperty()
    orderQtyPcsOld: number;
    @ApiProperty()
    transportMethodNameOld: string;
    @ApiProperty()
    logisticsTypeNameOld: string;
    @ApiProperty()
    yarnOrderRequestDateOld: string;
    @ApiProperty()
    fabricOrderRequestDateOld: string;
    @ApiProperty()
    colorOrderRequestDateOld: string;
    @ApiProperty()
    trimOrderRequestDateOld: string;
    @ApiProperty()
    POOrderRequestDateOld: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    displayMonthWK: string;
    @ApiProperty()
    displayMonthWKColumn: number;
    @ApiProperty()
    groupCd: string;
    @ApiProperty()
    showColorFlag: number;
    @ApiProperty()
    orderQtyCoeff: number;
    @ApiProperty()
    factoryComment: string;
    @ApiProperty()
    factoryCommentUpdateDate: string;
    @ApiProperty()
    FRFabricCode: string;
    @ApiProperty()
    FRFabricName: string;
    @ApiProperty()
    Ph1FirstDiscriminationFlagOld: string;
    @ApiProperty()
    Ph1FirstDiscriminationFlag: string;
    @ApiProperty()
    orderTimingDisplayValueOld: string;
    @ApiProperty()
    orderTimingDisplayValue: string;
    @ApiProperty()
    expressLineFlagOld: string;
    @ApiProperty()
    expressLineFlag: string;
    @ApiProperty()
    manualLockFlagOld: string;
    @ApiProperty()
    manualLockFlag: string;
    @ApiProperty()
    Ph1FirstDiscriminationFlagNow: string;
    @ApiProperty()
    orderTimingDisplayValueNow: string;
    @ApiProperty()
    expressLineFlagNow: string;
    @ApiProperty()
    ManualLockFlagNow: string;
    @ApiProperty()
    requestedWhDateOld: string;
    @ApiProperty()
    EXF: string;
    @ApiProperty()
    colorRecommend: string;
    @ApiProperty()
    trimRecommend: string;
    @ApiProperty()
    PORecommend: string;
    @ApiProperty()
    BD_EXF_DLSettingLTBeforeCal: number;
    @ApiProperty()
    PO_EXF_DLSettingLTBeforeCal: number;
    @ApiProperty()
    materialSupplierHolidayExcluding: number;
    @ApiProperty()
    sewingFTYHolidayExcluding: number;
    @ApiProperty()
    BD_EXF_DLSettingLT: number;
    @ApiProperty()
    PO_EXF_DLSettingLT: number;
    @ApiProperty()
    BD_EXFRegisteredLT: number;
    @ApiProperty()
    PO_EXFRegisteredLT: number;
    @ApiProperty()
    BD_EXFtotalAbnormalLT: number;
    @ApiProperty()
    PO_EXFtotalAbnormalLT: number;
    @ApiProperty()
    abnormalLTReasonBD1: number;
    @ApiProperty()
    abnormalLTReasonBD2: number;
    @ApiProperty()
    abnormalLTReasonBD3: number;
    @ApiProperty()
    abnormalLTReasonBD4: number;
    @ApiProperty()
    abnormalLTReasonBD5: number;
    @ApiProperty()
    abnormalLTBD1: number;
    @ApiProperty()
    abnormalLTBD2: number;
    @ApiProperty()
    abnormalLTBD3: number;
    @ApiProperty()
    abnormalLTBD4: number;
    @ApiProperty()
    abnormalLTBD5: number;
    @ApiProperty()
    abnormalLTReasonPO1: number;
    @ApiProperty()
    abnormalLTReasonPO2: number;
    @ApiProperty()
    abnormalLTReasonPO3: number;
    @ApiProperty()
    abnormalLTReasonPO4: number;
    @ApiProperty()
    abnormalLTReasonPO5: number;
    @ApiProperty()
    abnormalLTPO1: number;
    @ApiProperty()
    abnormalLTPO2: number;
    @ApiProperty()
    abnormalLTPO3: number;
    @ApiProperty()
    abnormalLTPO4: number;
    @ApiProperty()
    abnormalLTPO5: number;
    @ApiProperty()
    userName: string;
    @ApiProperty()
    version?: number;

    constructor(
        productionPlanId: string,
        year: string,
        planningSeason: string,
        season: string,
        itemBrand: string,
        businessUnit: string,
        itemCode: string,
        itemName: string,
        mainSampleCode: string,
        mainSampleName: string,
        supplierRMCode: string,
        supplierRMName: string,
        vendorCode: string,
        vendorName: string,
        managementFactoryCode: string,
        managementFactoryName: string,
        branchFactoryCode: string,
        branchFactoryName: string,
        rmSupplierCode: string,
        rmSupplierName: string,
        sewingDifficulty: number,
        departmentCode: string,
        departmentName: string,
        class1Code: string,
        Class1Name: string,
        productionPlanTypeName: string,
        monthWeekFlag: boolean,
        lastUpdateDate: string,
        requestedWhDate: string,
        contractedDate: string,
        transportMethodName: string,
        logisticsTypeName: string,
        orderQtyPcs: number,
        yarnOrderAcceptance: string,
        yarnOrderRequestDate: string,
        yarnOrderAnswerDate: string,
        yarnOrderActualDate: string,
        yarnOrderNO: string,
        yarnActualOrderQtyPcs: number,
        yarnUpdateDate: string,
        fabricOrderAcceptance: string,
        fabricOrderRequestDate: string,
        fabricOrderAnswerDate: string,
        fabricOrderActualDate: string,
        fabricOrderNO: string,
        fabricActualOrderQtyPcs: number,
        fabricUpdateDate: string,
        colorOrderAcceptance: string,
        colorOrderRequestDate: string,
        colorOrderAnswerDate: string,
        colorOrderActualDate: string,
        colorOrderNO: string,
        colorActualOrderQtyPcs: number,
        colorUpdateDate: string,
        trimOrderAcceptance: string,
        trimOrderRequestDate: string,
        trimOrderAnswerDate: string,
        trimOrderActualDate: string,
        trimOrderNO: string,
        trimActualOrderQtyPcs: number,
        trimUpdateDate: string,
        POOrderAcceptance: string,
        POOrderRequestDate: string,
        POOrderAnswerDate: string,
        POOrderActualDate: string,
        POOrderNO: string,
        POActualOrderQtyPcs: number,
        POUpdateDate: string,
        orderQtyPcsOld: number,
        transportMethodNameOld: string,
        logisticsTypeNameOld: string,
        yarnOrderRequestDateOld: string,
        fabricOrderRequestDateOld: string,
        colorOrderRequestDateOld: string,
        trimOrderRequestDateOld: string,
        POOrderRequestDateOld: string,
        status: string,
        displayMonthWK: string,
        displayMonthWKColumn: number,
        groupCd: string,
        showColorFlag: number,
        orderQtyCoeff: number,
        factoryComment: string,
        factoryCommentUpdateDate: string,
        FRFabricCode: string,
        FRFabricName: string,
        Ph1FirstDiscriminationFlagOld: string,
        Ph1FirstDiscriminationFlag: string,
        orderTimingDisplayValueOld: string,
        orderTimingDisplayValue: string,
        expressLineFlagOld: string,
        expressLineFlag: string,
        manualLockFlagOld: string,
        manualLockFlag: string,
        Ph1FirstDiscriminationFlagNow: string,
        orderTimingDisplayValueNow: string,
        expressLineFlagNow: string,
        ManualLockFlagNow: string,
        requestedWhDateOld: string,
        EXF: string,
        colorRecommend: string,
        trimRecommend: string,
        PORecommend: string,
        BD_EXF_DLSettingLTBeforeCal: number,
        PO_EXF_DLSettingLTBeforeCal: number,
        materialSupplierHolidayExcluding: number,
        sewingFTYHolidayExcluding: number,
        BD_EXF_DLSettingLT: number,
        PO_EXF_DLSettingLT: number,
        BD_EXFRegisteredLT: number,
        PO_EXFRegisteredLT: number,
        BD_EXFtotalAbnormalLT: number,
        PO_EXFtotalAbnormalLT: number,
        abnormalLTReasonBD1: number,
        abnormalLTReasonBD2: number,
        abnormalLTReasonBD3: number,
        abnormalLTReasonBD4: number,
        abnormalLTReasonBD5: number,
        abnormalLTBD1: number,
        abnormalLTBD2: number,
        abnormalLTBD3: number,
        abnormalLTBD4: number,
        abnormalLTBD5: number,
        abnormalLTReasonPO1: number,
        abnormalLTReasonPO2: number,
        abnormalLTReasonPO3: number,
        abnormalLTReasonPO4: number,
        abnormalLTReasonPO5: number,
        abnormalLTPO1: number,
        abnormalLTPO2: number,
        abnormalLTPO3: number,
        abnormalLTPO4: number,
        abnormalLTPO5: number,
        userName: string,
        version?: number) {
        this.productionPlanId = productionPlanId
        this.year = year
        this.planningSeason = planningSeason
        this.season = season
        this.itemBrand = itemBrand
        this.businessUnit = businessUnit
        this.itemCode = itemCode
        this.itemName = itemName
        this.mainSampleCode = mainSampleCode
        this.mainSampleName = mainSampleName
        this.supplierRMCode = supplierRMCode
        this.supplierRMName = supplierRMName
        this.vendorCode = vendorCode
        this.vendorName = vendorName
        this.managementFactoryCode = managementFactoryCode
        this.managementFactoryName = managementFactoryName
        this.branchFactoryCode = branchFactoryCode
        this.branchFactoryName = branchFactoryName
        this.rmSupplierCode = rmSupplierCode
        this.rmSupplierName = rmSupplierName
        this.sewingDifficulty = sewingDifficulty
        this.departmentCode = departmentCode
        this.departmentName = departmentName
        this.class1Code = class1Code
        this.Class1Name = Class1Name
        this.productionPlanTypeName = productionPlanTypeName
        this.monthWeekFlag = monthWeekFlag
        this.lastUpdateDate = lastUpdateDate
        this.requestedWhDate = requestedWhDate
        this.contractedDate = contractedDate
        this.transportMethodName = transportMethodName
        this.logisticsTypeName = logisticsTypeName
        this.orderQtyPcs = orderQtyPcs
        this.yarnOrderAcceptance = yarnOrderAcceptance
        this.yarnOrderRequestDate = yarnOrderRequestDate
        this.yarnOrderAnswerDate = yarnOrderAnswerDate
        this.yarnOrderActualDate = yarnOrderActualDate
        this.yarnOrderNO = yarnOrderNO
        this.yarnActualOrderQtyPcs = yarnActualOrderQtyPcs
        this.yarnUpdateDate = yarnUpdateDate
        this.fabricOrderAcceptance = fabricOrderAcceptance
        this.fabricOrderRequestDate = fabricOrderRequestDate
        this.fabricOrderAnswerDate = fabricOrderAnswerDate
        this.fabricOrderActualDate = fabricOrderActualDate
        this.fabricOrderNO = fabricOrderNO
        this.fabricActualOrderQtyPcs = fabricActualOrderQtyPcs
        this.fabricUpdateDate = fabricUpdateDate
        this.colorOrderAcceptance = colorOrderAcceptance
        this.colorOrderRequestDate = colorOrderRequestDate
        this.colorOrderAnswerDate = colorOrderAnswerDate
        this.colorOrderActualDate = colorOrderActualDate
        this.colorOrderNO = colorOrderNO
        this.colorActualOrderQtyPcs = colorActualOrderQtyPcs
        this.colorUpdateDate = colorUpdateDate
        this.trimOrderAcceptance = trimOrderAcceptance
        this.trimOrderRequestDate = trimOrderRequestDate
        this.trimOrderAnswerDate = trimOrderAnswerDate
        this.trimOrderActualDate = trimOrderActualDate
        this.trimOrderNO = trimOrderNO
        this.trimActualOrderQtyPcs = trimActualOrderQtyPcs
        this.trimUpdateDate = trimUpdateDate
        this.POOrderAcceptance = POOrderAcceptance
        this.POOrderRequestDate = POOrderRequestDate
        this.POOrderAnswerDate = POOrderAnswerDate
        this.POOrderActualDate = POOrderActualDate
        this.POOrderNO = POOrderNO
        this.POActualOrderQtyPcs = POActualOrderQtyPcs
        this.POUpdateDate = POUpdateDate
        this.orderQtyPcsOld = orderQtyPcsOld
        this.transportMethodNameOld = transportMethodNameOld
        this.logisticsTypeNameOld = logisticsTypeNameOld
        this.yarnOrderRequestDateOld = yarnOrderRequestDateOld
        this.fabricOrderRequestDateOld = fabricOrderRequestDateOld
        this.colorOrderRequestDateOld = colorOrderRequestDateOld
        this.trimOrderRequestDateOld = trimOrderRequestDateOld
        this.POOrderRequestDateOld = POOrderRequestDateOld
        this.status = status
        this.displayMonthWK = displayMonthWK
        this.displayMonthWKColumn = displayMonthWKColumn
        this.groupCd = groupCd
        this.showColorFlag = showColorFlag
        this.orderQtyCoeff = orderQtyCoeff
        this.factoryComment = factoryComment
        this.factoryCommentUpdateDate = factoryCommentUpdateDate
        this.FRFabricCode = FRFabricCode
        this.FRFabricName = FRFabricName
        this.Ph1FirstDiscriminationFlagOld = Ph1FirstDiscriminationFlagOld
        this.Ph1FirstDiscriminationFlag = Ph1FirstDiscriminationFlag
        this.orderTimingDisplayValueOld = orderTimingDisplayValueOld
        this.orderTimingDisplayValue = orderTimingDisplayValue
        this.expressLineFlagOld = expressLineFlagOld
        this.expressLineFlag = expressLineFlag
        this.manualLockFlagOld = manualLockFlagOld
        this.manualLockFlag = manualLockFlag
        this.Ph1FirstDiscriminationFlagNow = Ph1FirstDiscriminationFlagNow
        this.orderTimingDisplayValueNow = orderTimingDisplayValueNow
        this.expressLineFlagNow = expressLineFlagNow
        this.ManualLockFlagNow = ManualLockFlagNow
        this.requestedWhDateOld = requestedWhDateOld
        this.EXF = EXF
        this.colorRecommend = colorRecommend
        this.trimRecommend = trimRecommend
        this.PORecommend = PORecommend
        this.BD_EXF_DLSettingLTBeforeCal = BD_EXF_DLSettingLTBeforeCal
        this.PO_EXF_DLSettingLTBeforeCal = PO_EXF_DLSettingLTBeforeCal
        this.materialSupplierHolidayExcluding = materialSupplierHolidayExcluding
        this.sewingFTYHolidayExcluding = sewingFTYHolidayExcluding
        this.BD_EXF_DLSettingLT = BD_EXF_DLSettingLT
        this.PO_EXF_DLSettingLT = PO_EXF_DLSettingLT
        this.BD_EXFRegisteredLT = BD_EXFRegisteredLT
        this.PO_EXFRegisteredLT = PO_EXFRegisteredLT
        this.BD_EXFtotalAbnormalLT = BD_EXFtotalAbnormalLT
        this.PO_EXFtotalAbnormalLT = PO_EXFtotalAbnormalLT
        this.abnormalLTReasonBD1 = abnormalLTReasonBD1
        this.abnormalLTReasonBD2 = abnormalLTReasonBD2
        this.abnormalLTReasonBD3 = abnormalLTReasonBD3
        this.abnormalLTReasonBD4 = abnormalLTReasonBD4
        this.abnormalLTReasonBD5 = abnormalLTReasonBD5
        this.abnormalLTBD1 = abnormalLTBD1
        this.abnormalLTBD2 = abnormalLTBD2
        this.abnormalLTBD3 = abnormalLTBD3
        this.abnormalLTBD4 = abnormalLTBD4
        this.abnormalLTBD5 = abnormalLTBD5
        this.abnormalLTReasonPO1 = abnormalLTReasonPO1
        this.abnormalLTReasonPO2 = abnormalLTReasonPO2
        this.abnormalLTReasonPO3 = abnormalLTReasonPO3
        this.abnormalLTReasonPO4 = abnormalLTReasonPO4
        this.abnormalLTReasonPO5 = abnormalLTReasonPO5
        this.abnormalLTPO1 = abnormalLTPO1
        this.abnormalLTPO2 = abnormalLTPO2
        this.abnormalLTPO3 = abnormalLTPO3
        this.abnormalLTPO4 = abnormalLTPO4
        this.abnormalLTPO5 = abnormalLTPO5
        this.userName = userName
        this.version = version
    }
}