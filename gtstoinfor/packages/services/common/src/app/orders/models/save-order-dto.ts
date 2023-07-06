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
    version?: number;
}