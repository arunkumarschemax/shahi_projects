import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders') //change the name
export class ShahiEntities {
    @PrimaryGeneratedColumn("increment", {
        name: "id",
        
    })
    id: number;

    @Column({
        name:'production_plan_id',
        type:'varchar',
        unique: true,
        nullable:false
    })
    productionPlanId:string

    @Column('varchar', {
        name: "year",
        length:'5'
    })
    year: string;

    @Column('varchar', {
        name: "planning_season",
        length:'5'
    })
    planningSeason: string;

    @Column('varchar', {
        name: "season",
        length:'5'
    })
    season: string;


    @Column('varchar', {
        name: "item_brand",
        length:'10'
    })
    itemBrand: string;


    @Column('varchar', {
        name: "business_unit",
        length:'4'
    })
    businessUnit: string;


    @Column('varchar', {
        name: "item_code",
        length:'6'

    })
    itemCode: string;


    @Column('varchar', {
        name: "itemName"
    })
    itemName: string;


    @Column('varchar', {
        name: "main_sample_code",
        length:'11'
    })
    mainSampleCode: string;


    @Column('varchar', {
        name: "main_sample_name"
    })
    mainSampleName: string;


    @Column('varchar', {
        name: "supplier_rm_code",
    })
    supplierRMCode: string;


    @Column('varchar', {
        name: "supplier_rm_name"
    })
    supplierRMName: string;


    @Column('varchar', {
        name: "vendor_code",
        length:4
    })
    vendorCode: string;


    @Column('varchar', {
        name: "vendor_name",
    })
    vendorName: string;


    @Column('varchar', {
        name: "management_factory_code",
        length:5
    })
    managementFactoryCode: string;


    @Column('varchar', {
        name: "management_factory_name"
    })
    managementFactoryName: string;


    @Column('varchar', {
        name: "branch_factory_code",
        length:4
    })
    branchFactoryCode: string;


    @Column('varchar', {
        name: "branch_factory_name"
    })
    branchFactoryName: string;


    @Column('varchar', {
        name: "rm_supplier_code"
    })
    rmSupplierCode: string;


    @Column('varchar', {
        name: "rm_supplier_name",
       
    })
    rmSupplierName: string;


    @Column('decimal', { precision: 10, scale: 2,name:'sewing_difficulty' })
    sewingDifficulty: number;


    @Column('varchar', {
        name: "department_code",
        length:1
    })
    departmentCode: string;


    @Column('varchar', {
        name: "department_name",
        length:'12'
    })
    departmentName: string;


    @Column('varchar', {
        name: "class1_code",
        length:2
    })
    class1Code: string;


    @Column('varchar', {
        name: "class1_name"
    })
    Class1Name: string;


    @Column('varchar', {
        name: "prod_plan_type_name",  // prodoction plan type name
        length:20
    })
    productionPlanTypeName: string;


    @Column('boolean', {
        name: "month_week_flag"
    })
    monthWeekFlag: boolean;


    @Column('date', {
        name: "last_update_date"
    })
    lastUpdateDate: Date;


    @Column('date', {
        name: "requested_wh_date"
    })
    requestedWhDate: Date;


    @Column('date', {
        name: "contracted_date"
    })
    contractedDate: Date;


    @Column('varchar', {
        name: "transport_method_name",
        length:20
    })
    transportMethodName: string;


    @Column('varchar', {
        name: "logistics_type_name",
        length:3
    })
    logisticsTypeName: string;


    @Column('date', {
        name: "EXF"
    })
    EXF: Date;


    @Column('int', {
        name: "order_qty_pcs"
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


    @Column('int', {
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


    @Column('int', {
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


    @Column('int', {
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


    @Column('int', {
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


    @Column('int', {
        name: "POOrderNO"
    })
    POOrderNO: number;


    @Column('int', {
        name: "POActualOrderQtyPcs"
    })
    POActualOrderQtyPcs: number;


    @Column('date', {
        name: "POUpdateDate"
    })
    POUpdateDate: Date;


    @Column('int', {
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


    @Column('int', {
        name: "number"
    })
    status: string;


    @Column('date', {
        name: "displayMonthWK"
    })
    displayMonthWK: Date;


    @Column('int', {
        name: "displayMonthWKColumn"
    })
    displayMonthWKColumn: number;


    @Column('int', {
        name: "groupCd"
    })
    groupCd: number;


    @Column('int', {
        name: "showColorFlag"
    })
    showColorFlag: number;


    @Column('int', {
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


    @Column('int', {
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


    @Column('int', {
        name: "BD_EXF_DLSettingLTBeforeCal"
    })
    BD_EXF_DLSettingLTBeforeCal: number;


    @Column('int', {
        name: "PO_EXF_DLSettingLTBeforeCal"
    })
    PO_EXF_DLSettingLTBeforeCal: number;



    @Column('int', {
        name: "materialSupplierHolidayExcluding"
    })
    materialSupplierHolidayExcluding: number;


    @Column('int', {
        name: "sewingFTYHolidayExcluding"
    })
    sewingFTYHolidayExcluding: number;


    @Column('int', {
        name: "BD_EXF_DLSettingLT"
    })
    BD_EXF_DLSettingLT: number;


    @Column('int', {
        name: "PO_EXF_DLSettingLT"
    })
    PO_EXF_DLSettingLT: number;


    @Column('int', {
        name: "BD_EXFRegisteredLT"
    })
    BD_EXFRegisteredLT: number;


    @Column('int', {
        name: "PO_EXFRegisteredLT"
    })
    PO_EXFRegisteredLT: number;


    @Column('int', {
        name: "BD_EXFtotalAbnormalLT"
    })
    BD_EXFtotalAbnormalLT: number;


    @Column('int', {
        name: "PO_EXFtotalAbnormalLT"
    })
    PO_EXFtotalAbnormalLT: number;


    @Column('int', {
        name: "abnormalLTReasonBD1"
    })
    abnormalLTReasonBD1: number;


    @Column('int', {
        name: "abnormalLTReasonBD2"
    })
    abnormalLTReasonBD2: number;


    @Column('int', {
        name: "abnormalLTReasonBD3"
    })
    abnormalLTReasonBD3: number;


    @Column('int', {
        name: "abnormalLTReasonBD4"
    })
    abnormalLTReasonBD4: number;


    @Column('int', {
        name: "abnormalLTReasonBD5"
    })
    abnormalLTReasonBD5: number;


    @Column('int', {
        name: "abnormalLTBD1"
    })
    abnormalLTBD1: number;


    @Column('int', {
        name: "abnormalLTBD2"
    })
    abnormalLTBD2: number;


    @Column('int', {
        name: "abnormalLTBD3"
    })
    abnormalLTBD3: number;


    @Column('int', {
        name: "abnormalLTBD4"
    })
    abnormalLTBD4: number;


    @Column('int', {
        name: "abnormalLTBD5"
    })
    abnormalLTBD5: number;


    @Column('int', {
        name: "abnormalLTReasonPO1"
    })
    abnormalLTReasonPO1: number;


    @Column('int', {
        name: "abnormalLTReasonPO2"
    })
    abnormalLTReasonPO2: number;


    @Column('int', {
        name: "abnormalLTReasonPO3"
    })
    abnormalLTReasonPO3: number;


    @Column('int', {
        name: "abnormalLTReasonPO4"
    })
    abnormalLTReasonPO4: number;


    @Column('int', {
        name: "abnormalLTReasonPO5"
    })
    abnormalLTReasonPO5: number;


    @Column('int', {
        name: "abnormalLTPO1"
    })
    abnormalLTPO1: number;


    @Column('int', {
        name: "abnormalLTPO2"
    })
    abnormalLTPO2: number;


    @Column('int', {
        name: "abnormalLTPO3"
    })
    abnormalLTPO3: number;


    @Column('int', {
        name: "abnormalLTPO4"
    })
    abnormalLTPO4: number;


    @Column('int', {
        name: "abnormalLTPO5"
    })
    abnormalLTPO5: number;

}