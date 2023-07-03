import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Shahi-Schemax') //change the name
export class ShahiEntities {
    @PrimaryGeneratedColumn("increment", {
        name: "productionPlanId"
    })
    productionPlanId: number;


    @Column('integer', {
        name: "year"
    })
    year: number;

    @Column('varchar', {
        name: "planningSeason"
    })
    planningSeason: string;

    @Column('varchar', {
        name: "season"
    })
    season: string;


    @Column('varchar', {
        name: "itemBrand"
    })
    itemBrand: string;


    @Column('varchar', {
        name: "businessUnit"
    })
    businessUnit: string;


    @Column('integer', {
        name: "itemCode"
    })
    itemCode: number;


    @Column('varchar', {
        name: "itemName"
    })
    itemName: string;


    @Column('varchar', {
        name: "mainSampleCode"
    })
    mainSampleCode: string;


    @Column('varchar', {
        name: "mainSampleName"
    })
    mainSampleName: string;


    @Column('varchar', {
        name: "supplierRawMaterialCode"
    })
    supplierRawMaterialCode: string;


    @Column('varchar', {
        name: "supplierRawMaterialName"
    })
    supplierRawMaterialName: string;


    @Column('integer', {
        name: "vendorCode"
    })
    vendorCode: number;


    @Column('varchar', {
        name: "vendorName"
    })
    vendorName: string;


    @Column('varchar', {
        name: "managementFactoryCode"
    })
    managementFactoryCode: string;


    @Column('varchar', {
        name: "managementFactoryName"
    })
    managementFactoryName: string;


    @Column('varchar', {
        name: "branchFactoryCode"
    })
    branchFactoryCode: string;


    @Column('varchar', {
        name: "branchFactoryName"
    })
    branchFactoryName: string;


    @Column('varchar', {
        name: "rawMaterialSupplierCode"
    })
    rawMaterialSupplierCode: string;


    @Column('varchar', {
        name: "rawMaterialSupplierName"
    })
    rawMaterialSupplierName: string;


    @Column('integer', {
        name: "sewingDifficulty"
    })
    sewingDifficulty: number;


    @Column('integer', {
        name: "departmentCode"
    })
    departmentCode: number;


    @Column('varchar', {
        name: "departmentName"
    })
    departmentName: string;


    @Column('integer', {
        name: "class1Code"
    })
    class1Code: number;


    @Column('varchar', {
        name: "Class1Name"
    })
    Class1Name: string;


    @Column('varchar', {
        name: "productionPlanTypeName"
    })
    productionPlanTypeName: string;


    @Column('integer', {
        name: "monthWeekFlag"
    })
    monthWeekFlag: number;


    @Column('date', {
        name: "lastUpdateDate"
    })
    lastUpdateDate: Date;


    @Column('date', {
        name: "requestedWhDate"
    })
    requestedWhDate: Date;


    @Column('date', {
        name: "contractedDate"
    })
    contractedDate: Date;


    @Column('varchar', {
        name: "transportMethodName"
    })
    transportMethodName: string;


    @Column('varchar', {
        name: "logisticsTypeName"
    })
    logisticsTypeName: string;


    @Column('date', {
        name: "EXF"
    })
    EXF: Date;


    @Column('integer', {
        name: "orderQtyPcs"
    })
    orderQtyPcs: number;


    @Column('varchar', {
        name: "yarnOrderAcceptance"
    })
    yarnOrderAcceptance: string;


    @Column('date', {
        name: "yarnOrderRequestDate"
    })
    yarnOrderRequestDate: Date;


    @Column('date', {
        name: "yarnOrderAnswerDate"
    })
    yarnOrderAnswerDate: Date;


    @Column('date', {
        name: "yarnOrderActualDate"
    })
    yarnOrderActualDate: Date;


    @Column('varchar', {
        name: "yarnOrderNO"
    })
    yarnOrderNO: string;


    @Column('integer', {
        name: "yarnActualOrderQtyPcs"
    })
    yarnActualOrderQtyPcs: number;


    @Column('date', {
        name: "yarnUpdateDate"
    })
    yarnUpdateDate: Date;


    @Column('varchar', {
        name: "fabricOrderAcceptance"
    })
    fabricOrderAcceptance: string;


    @Column('date', {
        name: "fabricOrderRequestDate"
    })
    fabricOrderRequestDate: Date;


    @Column('date', {
        name: "fabricOrderAnswerDate"
    })
    fabricOrderAnswerDate: Date;


    @Column('date', {
        name: "fabricOrderActualDate"
    })
    fabricOrderActualDate: Date;


    @Column('varchar', {
        name: "fabricOrderNO"
    })
    fabricOrderNO: string;


    @Column('integer', {
        name: "fabricActualOrderQtyPcs"
    })
    fabricActualOrderQtyPcs: number;


    @Column('date', {
        name: "fabricUpdateDate"
    })
    fabricUpdateDate: Date;


    @Column('varchar', {
        name: "colorOrderAcceptance"
    })
    colorOrderAcceptance: string;


    @Column('date', {
        name: "colorOrderRequestDate"
    })
    colorOrderRequestDate: Date;


    @Column('date', {
        name: "colorOrderAnswerDate"
    })
    colorOrderAnswerDate: Date;


    @Column('date', {
        name: "colorOrderActualDate"
    })
    colorOrderActualDate: Date;


    @Column('varchar', {
        name: "colorOrderNO"
    })
    colorOrderNO: string;


    @Column('integer', {
        name: "colorActualOrderQtyPcs"
    })
    colorActualOrderQtyPcs: number;


    @Column('date', {
        name: "colorUpdateDate"
    })
    colorUpdateDate: Date;


    @Column('varchar', {
        name: "trimOrderAcceptance"
    })
    trimOrderAcceptance: string;


    @Column('date', {
        name: "trimOrderRequestDate"
    })
    trimOrderRequestDate: Date;


    @Column('date', {
        name: "trimOrderAnswerDate"
    })
    trimOrderAnswerDate: Date;


    @Column('date', {
        name: "trimOrderActualDate"
    })
    trimOrderActualDate: Date;


    @Column('varchar', {
        name: "trimOrderNO"
    })
    trimOrderNO: string;


    @Column('integer', {
        name: "trimActualOrderQtyPcs"
    })
    trimActualOrderQtyPcs: number;


    @Column('date', {
        name: "trimUpdateDate"
    })
    trimUpdateDate: Date;


    @Column('varchar', {
        name: "POOrderAcceptance"
    })
    POOrderAcceptance: string;


    @Column('date', {
        name: "POOrderRequestDate"
    })
    POOrderRequestDate: Date;


    @Column('date', {
        name: "POOrderAnswerDate"
    })
    POOrderAnswerDate: Date;


    @Column('date', {
        name: "POOrderActualDate"
    })
    POOrderActualDate: Date;


    @Column('integer', {
        name: "POOrderNO"
    })
    POOrderNO: number;


    @Column('integer', {
        name: "POActualOrderQtyPcs"
    })
    POActualOrderQtyPcs: number;


    @Column('date', {
        name: "POUpdateDate"
    })
    POUpdateDate: Date;


    @Column('integer', {
        name: "orderQtyPcsOld"
    })
    orderQtyPcsOld: number;


    @Column('varchar', {
        name: "transportMethodNameOld"
    })
    transportMethodNameOld: string;


    @Column('varchar', {
        name: "logisticsTypeNameOld"
    })
    logisticsTypeNameOld: string;


    @Column('date', {
        name: "yarnOrderRequestDateOld"
    })
    yarnOrderRequestDateOld: Date;


    @Column('date', {
        name: "fabricOrderRequestDateOld"
    })
    fabricOrderRequestDateOld: Date;


    @Column('date', {
        name: "colorOrderRequestDateOld"
    })
    colorOrderRequestDateOld: Date;


    @Column('date', {
        name: "trimOrderRequestDateOld"
    })
    trimOrderRequestDateOld: Date;


    @Column('date', {
        name: "POOrderRequestDateOld"
    })
    POOrderRequestDateOld: Date;


    @Column('integer', {
        name: "number"
    })
    status: string;


    @Column('date', {
        name: "displayMonthWK"
    })
    displayMonthWK: Date;


    @Column('integer', {
        name: "displayMonthWKColumn"
    })
    displayMonthWKColumn: number;


    @Column('integer', {
        name: "groupCd"
    })
    groupCd: number;


    @Column('integer', {
        name: "showColorFlag"
    })
    showColorFlag: number;


    @Column('integer', {
        name: "orderQtyCoeff"
    })
    orderQtyCoeff: number;


    @Column('varchar', {
        name: "factoryComment"
    })
    factoryComment: string;


    @Column('date', {
        name: "factoryCommentUpdateDate"
    })
    factoryCommentUpdateDate: Date;


    @Column('integer', {
        name: "FRFabricCode"
    })
    FRFabricCode: number;


    @Column('varchar', {
        name: "FRFabricName"
    })
    FRFabricName: string;


    @Column('varchar', {
        name: "Ph1FirstDiscriminationFlagOld"
    })
    Ph1FirstDiscriminationFlagOld: string;


    @Column('varchar', {
        name: "Ph1FirstDiscriminationFlag"
    })
    Ph1FirstDiscriminationFlag: string;


    @Column('varchar', {
        name: "orderTimingDisplayValueOld"
    })
    orderTimingDisplayValueOld: string;


    @Column('varchar', {
        name: "orderTimingDisplayValue"
    })
    orderTimingDisplayValue: string;


    @Column('varchar', {
        name: "expressLineFlagOld"
    })
    expressLineFlagOld: string;


    @Column('varchar', {
        name: "expressLineFlag"
    })
    expressLineFlag: string;


    @Column('varchar', {
        name: "manualLockFlagOld"
    })
    manualLockFlagOld: string;


    @Column('varchar', {
        name: "manualLockFlag"
    })
    manualLockFlag: string;


    @Column('varchar', {
        name: "Ph1FirstDiscriminationFlagNow"
    })
    Ph1FirstDiscriminationFlagNow: string;


    @Column('varchar', {
        name: "orderTimingDisplayValueNow"
    })
    orderTimingDisplayValueNow: string;


    @Column('varchar', {
        name: "expressLineFlagNow"
    })
    expressLineFlagNow: string;


    @Column('varchar', {
        name: "ManualLockFlagNow"
    })
    ManualLockFlagNow: string;


    @Column('date', {
        name: "requestedWhDateOld"
    })
    requestedWhDateOld: Date;


    @Column('date', {
        name: "EXF2"
    })
    EXF2: Date;


    @Column('date', {
        name: "colorRecommend"
    })
    colorRecommend: Date;


    @Column('date', {
        name: "trimRecommend"
    })
    trimRecommend: Date;


    @Column('date', {
        name: "PORecommend"
    })
    PORecommend: Date;


    @Column('integer', {
        name: "BD_EXF_DLSettingLTBeforeCal"
    })
    BD_EXF_DLSettingLTBeforeCal: number;


    @Column('integer', {
        name: "PO_EXF_DLSettingLTBeforeCal"
    })
    PO_EXF_DLSettingLTBeforeCal: number;



    @Column('integer', {
        name: "materialSupplierHolidayExcluding"
    })
    materialSupplierHolidayExcluding: number;


    @Column('integer', {
        name: "sewingFTYHolidayExcluding"
    })
    sewingFTYHolidayExcluding: number;


    @Column('integer', {
        name: "BD_EXF_DLSettingLT"
    })
    BD_EXF_DLSettingLT: number;


    @Column('integer', {
        name: "PO_EXF_DLSettingLT"
    })
    PO_EXF_DLSettingLT: number;


    @Column('integer', {
        name: "BD_EXFRegisteredLT"
    })
    BD_EXFRegisteredLT: number;


    @Column('integer', {
        name: "PO_EXFRegisteredLT"
    })
    PO_EXFRegisteredLT: number;


    @Column('integer', {
        name: "BD_EXFtotalAbnormalLT"
    })
    BD_EXFtotalAbnormalLT: number;


    @Column('integer', {
        name: "PO_EXFtotalAbnormalLT"
    })
    PO_EXFtotalAbnormalLT: number;


    @Column('integer', {
        name: "abnormalLTReasonBD1"
    })
    abnormalLTReasonBD1: number;


    @Column('integer', {
        name: "abnormalLTReasonBD2"
    })
    abnormalLTReasonBD2: number;


    @Column('integer', {
        name: "abnormalLTReasonBD3"
    })
    abnormalLTReasonBD3: number;


    @Column('integer', {
        name: "abnormalLTReasonBD4"
    })
    abnormalLTReasonBD4: number;


    @Column('integer', {
        name: "abnormalLTReasonBD5"
    })
    abnormalLTReasonBD5: number;


    @Column('integer', {
        name: "abnormalLTBD1"
    })
    abnormalLTBD1: number;


    @Column('integer', {
        name: "abnormalLTBD2"
    })
    abnormalLTBD2: number;


    @Column('integer', {
        name: "abnormalLTBD3"
    })
    abnormalLTBD3: number;


    @Column('integer', {
        name: "abnormalLTBD4"
    })
    abnormalLTBD4: number;


    @Column('integer', {
        name: "abnormalLTBD5"
    })
    abnormalLTBD5: number;


    @Column('integer', {
        name: "abnormalLTReasonPO1"
    })
    abnormalLTReasonPO1: number;


    @Column('integer', {
        name: "abnormalLTReasonPO2"
    })
    abnormalLTReasonPO2: number;


    @Column('integer', {
        name: "abnormalLTReasonPO3"
    })
    abnormalLTReasonPO3: number;


    @Column('integer', {
        name: "abnormalLTReasonPO4"
    })
    abnormalLTReasonPO4: number;


    @Column('integer', {
        name: "abnormalLTReasonPO5"
    })
    abnormalLTReasonPO5: number;


    @Column('integer', {
        name: "abnormalLTPO1"
    })
    abnormalLTPO1: number;


    @Column('integer', {
        name: "abnormalLTPO2"
    })
    abnormalLTPO2: number;


    @Column('integer', {
        name: "abnormalLTPO3"
    })
    abnormalLTPO3: number;


    @Column('integer', {
        name: "abnormalLTPO4"
    })
    abnormalLTPO4: number;


    @Column('integer', {
        name: "abnormalLTPO5"
    })
    abnormalLTPO5: number;

}