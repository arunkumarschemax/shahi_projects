import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders') //change the name
export class ShahiEntities {
    @PrimaryGeneratedColumn("increment", {
        name: "id",

    })
    id: number;

    @Column({
        name: 'production_plan_id',
        type: 'varchar',
        unique: true,
        nullable: false
    })
    productionPlanId: string

    @Column('varchar', {
        name: "year",
        length: '5'
    })
    year: string;

    @Column('varchar', {
        name: "planning_season",
        length: '5'
    })
    planningSeason: string;

    @Column('varchar', {
        name: "season",
        length: '5'
    })
    season: string;


    @Column('varchar', {
        name: "item_brand",
        length: '10'
    })
    itemBrand: string;


    @Column('varchar', {
        name: "business_unit",
        length: '4'
    })
    businessUnit: string;


    @Column('varchar', {
        name: "item_code",
        length: '6'

    })
    itemCode: string;


    @Column('varchar', {
        name: "itemName"
    })
    itemName: string;


    @Column('varchar', {
        name: "main_sample_code",
        length: '11'
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
        length: 4
    })
    vendorCode: string;


    @Column('varchar', {
        name: "vendor_name",
    })
    vendorName: string;


    @Column('varchar', {
        name: "management_factory_code",
        length: 5
    })
    managementFactoryCode: string;


    @Column('varchar', {
        name: "management_factory_name"
    })
    managementFactoryName: string;


    @Column('varchar', {
        name: "branch_factory_code",
        length: 4
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


    @Column('decimal', { precision: 10, scale: 2, name: 'sewing_difficulty' })
    sewingDifficulty: number;


    @Column('varchar', {
        name: "department_code",
        length: 1
    })
    departmentCode: string;


    @Column('varchar', {
        name: "department_name",
        length: '12'
    })
    departmentName: string;


    @Column('varchar', {
        name: "class1_code",
        length: 2
    })
    class1Code: string;


    @Column('varchar', {
        name: "class1_name"
    })
    Class1Name: string;


    @Column('varchar', {
        name: "prod_plan_type_name",  // prodoction plan type name
        length: 20
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
        length: 20
    })
    transportMethodName: string;


    @Column('varchar', {
        name: "logistics_type_name",
        length: 3
    })
    logisticsTypeName: string;


    @Column('date', {
        name: "EXF"
    })
    EXF: Date;


    @Column('int', {
        name: "order_qty_pcs",
    })
    orderQtyPcs: number;

    @Column('varchar', {
        name: "yarn_order_acceptance",
        length: 3
    })
    yarnOrderAcceptance: string;


    @Column('date', {
        name: "yarn_order_req_date"
    })
    yarnOrderRequestDate: Date;


    @Column('date', {
        name: "yarn_order_ans_date"
    })
    yarnOrderAnswerDate: Date;


    @Column('date', {
        name: "yarn_order_actual_ate"
    })
    yarnOrderActualDate: Date;


    @Column('varchar', {
        name: "yarn_order_no",
        length: 21
    })
    yarnOrderNO: string;


    @Column('int', {
        name: "yarn_actual_order_qty_pcs"
    })
    yarnActualOrderQtyPcs: number;


    @Column('date', {
        name: "yarn_update_date"
    })
    yarnUpdateDate: Date;


    @Column('varchar', {
        name: "fabric_order_acceptance",
        length: 3
    })
    fabricOrderAcceptance: string;


    @Column('date', {
        name: "fabric_order_req_date"
    })
    fabricOrderRequestDate: Date;


    @Column('date', {
        name: "fabric_order_ans_date"
    })
    fabricOrderAnswerDate: Date;


    @Column('date', {
        name: "fabric_order_actual_date"
    })
    fabricOrderActualDate: Date;


    @Column('varchar', {
        name: "fabric_order_no",
        length: 21
    })
    fabricOrderNO: string;


    @Column('int', {
        name: "fabric_actual_order_qty_pcs"
    })
    fabricActualOrderQtyPcs: number;


    @Column('date', {
        name: "fabric_update_date"
    })
    fabricUpdateDate: Date;


    @Column('varchar', {
        name: "color_order_acceptance",
        length: 3
    })
    colorOrderAcceptance: string;


    @Column('date', {
        name: "color_order_req_date"
    })
    colorOrderRequestDate: Date;


    @Column('date', {
        name: "color_order_ans_date"
    })
    colorOrderAnswerDate: Date;


    @Column('date', {
        name: "color_order_actual_date"
    })
    colorOrderActualDate: Date;


    @Column('varchar', {
        name: "color_order_no",
        length: 20
    })
    colorOrderNO: string;


    @Column('int', {
        name: "color_actual_order_qty_pcs"
    })
    colorActualOrderQtyPcs: number;


    @Column('date', {
        name: "color_update_date"
    })
    colorUpdateDate: Date;


    @Column('varchar', {
        name: "trim_order_acceptance",
        length: 3
    })
    trimOrderAcceptance: string;


    @Column('date', {
        name: "trim_order_req_date"
    })
    trimOrderRequestDate: Date;


    @Column('date', {
        name: "trim_order_ans_date"
    })
    trimOrderAnswerDate: Date;


    @Column('date', {
        name: "trim_order_actual_date"
    })
    trimOrderActualDate: Date;


    @Column('varchar', {
        name: "trim_order_no",
        length: 20
    })
    trimOrderNO: string;


    @Column('int', {
        name: "trim_actual_order_qty_pcs"
    })
    trimActualOrderQtyPcs: number;


    @Column('date', {
        name: "trim_update_date"
    })
    trimUpdateDate: Date;


    @Column('varchar', {
        name: "po_order_acceptance",
        length: 3
    })
    POOrderAcceptance: string;


    @Column('date', {
        name: "po_order_req_date"
    })
    POOrderRequestDate: Date;


    @Column('date', {
        name: "po_order_ans_date"
    })
    POOrderAnswerDate: Date;


    @Column('date', {
        name: "po_order_actual_date"
    })
    POOrderActualDate: Date;


    @Column('int', {
        name: "po_order_no"
    })
    POOrderNO: number;


    @Column('int', {
        name: "po_actual_order_qty_pcs"
    })
    POActualOrderQtyPcs: number;


    @Column('date', {
        name: "po_update_date"
    })
    POUpdateDate: Date;


    @Column('int', {
        name: "order_qty_pcs_old"
    })
    orderQtyPcsOld: number;


    @Column('varchar', {
        name: "transport_method_name_old"
    })
    transportMethodNameOld: string;


    @Column('varchar', {
        name: "logistics_type_name_old"
    })
    logisticsTypeNameOld: string;


    @Column('date', {
        name: "yarn_order_req_date_old"
    })
    yarnOrderRequestDateOld: Date;


    @Column('date', {
        name: "fabric_order_req_date_old"
    })
    fabricOrderRequestDateOld: Date;


    @Column('date', {
        name: "color_order_req_date_old"
    })
    colorOrderRequestDateOld: Date;


    @Column('date', {
        name: "trim_order_req_date_old"
    })
    trimOrderRequestDateOld: Date;


    @Column('date', {
        name: "po_order_req_date_old"
    })
    POOrderRequestDateOld: Date;


    @Column('int', {
        name: "status"
    })
    status: string;

    @Column('varchar', {
        name: "display_month_wk",
        length: 15
    })
    displayMonthWK: string;

    @Column('int', {
        name: "display_month_wk_column"
    })
    displayMonthWKColumn: number;


    @Column('varchar', {
        name: "group_cd",
        length: 5
    })
    groupCd: string;


    @Column('int', {
        name: "show_color_flag"
    })
    showColorFlag: number;


    @Column('int', {
        name: "orderqty_coeff"
    })
    orderQtyCoeff: number;


    @Column('varchar', {
        name: "factory_comment"
    })
    factoryComment: string;


    @Column('date', {
        name: "factory_comment_update_date"
    })
    factoryCommentUpdateDate: Date;


    @Column('int', {
        name: "FRFabricCode"
    })
    FRFabricCode: number;


    @Column('varchar', {
        name: "fr_fabric_name",
        length: 12
    })
    FRFabricName: string;


    @Column('varchar', {
        name: "ph1_first_disc_flag_old",
        length: 3
    })
    Ph1FirstDiscriminationFlagOld: string;


    @Column('varchar', {
        name: "ph1_first_disc_flag",
        length: 3
    })
    Ph1FirstDiscriminationFlag: string;


    @Column('varchar', {
        name: "order_timing_display_value_old",
        length: 4
    })
    orderTimingDisplayValueOld: string;


    @Column('varchar', {
        name: "order_timing_display_value",
        length: 4
    })
    orderTimingDisplayValue: string;

    @Column('varchar', {
        name: "express_line_flag_old",
        length: 3
    })
    expressLineFlagOld: string;


    @Column('varchar', {
        name: "express_line_flag",
        length: 3
    })
    expressLineFlag: string;


    @Column('varchar', {
        name: "manual_lock_flag_old",
        length: 3
    })
    manualLockFlagOld: string;


    @Column('varchar', {
        name: "manual_lock_flag",
        length: 3
    })
    manualLockFlag: string;


    @Column('varchar', {
        name: "ph1_first_disc_flag_now",
        length: 3
    })
    Ph1FirstDiscriminationFlagNow: string;


    @Column('varchar', {
        name: "order_timing_display_value_now",
        length: 4
    })
    orderTimingDisplayValueNow: string;


    @Column('varchar', {
        name: "express_line_flag_now",
        length: 2
    })
    expressLineFlagNow: string;


    @Column('varchar', {
        name: "manual_lock_flag_now",
        length: 2
    })
    ManualLockFlagNow: string;


    @Column('date', {
        name: "req_wh_date_old"
    })
    requestedWhDateOld: Date;


    @Column('date', {
        name: "exf2"
    })
    EXF2: Date;


    @Column('date', {
        name: "color_recommend"
    })
    colorRecommend: Date;


    @Column('date', {
        name: "trim_recommend"
    })
    trimRecommend: Date;


    @Column('date', {
        name: "po_recommend"
    })
    PORecommend: Date;


    @Column('int', {
        name: "bd_exf_dlsetting_ltbefore_cal"
    })
    BD_EXF_DLSettingLTBeforeCal: number;


    @Column('int', {
        name: "po_exf_dlsetting_ltbefore_cal"
    })
    PO_EXF_DLSettingLTBeforeCal: number;



    @Column('int', {
        name: "material_supl_holiday_excl"
    })
    materialSupplierHolidayExcluding: number;


    @Column('int', {
        name: "sewing_fty_holiday_excl"
    })
    sewingFTYHolidayExcluding: number;


    @Column('int', {
        name: "bd_exf_dlsetting_lt"
    })
    BD_EXF_DLSettingLT: number;


    @Column('int', {
        name: "po_exf_dlsetting_lt"
    })
    PO_EXF_DLSettingLT: number;


    @Column('int', {
        name: "bd_exf_reg_lt"
    })
    BD_EXFRegisteredLT: number;


    @Column('int', {
        name: "po_exf_reg_lt"
    })
    PO_EXFRegisteredLT: number;


    @Column('int', {
        name: "bd_exf_total_abnormal_lt"
    })
    BD_EXFtotalAbnormalLT: number;


    @Column('int', {
        name: "po_exf_total_abnormal_lt"
    })
    PO_EXFtotalAbnormalLT: number;


    @Column('int', {
        name: "abnormal_lt_reason_bd1"
    })
    abnormalLTReasonBD1: number;


    @Column('int', {
        name: "abnormal_lt_reason_bd2"
    })
    abnormalLTReasonBD2: number;


    @Column('int', {
        name: "abnormal_lt_reason_bd3"
    })
    abnormalLTReasonBD3: number;


    @Column('int', {
        name: "abnormal_lt_reason_bd4"
    })
    abnormalLTReasonBD4: number;


    @Column('int', {
        name: "abnormal_lt_reason_bd5"
    })
    abnormalLTReasonBD5: number;


    @Column('int', {
        name: "abnormal_lt_bd1"
    })
    abnormalLTBD1: number;


    @Column('int', {
        name: "abnormal_lt_bd2"
    })
    abnormalLTBD2: number;


    @Column('int', {
        name: "abnormal_lt_bd3"
    })
    abnormalLTBD3: number;


    @Column('int', {
        name: "abnormal_lt_bd4"
    })
    abnormalLTBD4: number;


    @Column('int', {
        name: "abnormal_lt_bd5"
    })
    abnormalLTBD5: number;


    @Column('int', {
        name: "abnormal_lt_reason_po1"
    })
    abnormalLTReasonPO1: number;


    @Column('int', {
        name: "abnormal_lt_reason_po2"
    })
    abnormalLTReasonPO2: number;


    @Column('int', {
        name: "abnormal_lt_reason_po3"
    })
    abnormalLTReasonPO3: number;


    @Column('int', {
        name: "abnormal_lt_reason_po4"
    })
    abnormalLTReasonPO4: number;


    @Column('int', {
        name: "abnormal_lt_reason_po5"
    })
    abnormalLTReasonPO5: number;


    @Column('int', {
        name: "abnormal_lt_po1"
    })
    abnormalLTPO1: number;


    @Column('int', {
        name: "abnormal_lt_po2"
    })
    abnormalLTPO2: number;


    @Column('int', {
        name: "abnormal_lt_po3"
    })
    abnormalLTPO3: number;


    @Column('int', {
        name: "abnormal_lt_po4"
    })
    abnormalLTPO4: number;


    @Column('int', {
        name: "abnormal_lt_po5"
    })
    abnormalLTPO5: number;

}