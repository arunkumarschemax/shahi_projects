import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdersChildEntity } from "./orders-child.entity";

@Entity('orders') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn({
        name: 'production_plan_id',
    })
    productionPlanId: string

    @Column('varchar', {
        nullable: true,
        name: "year",
        length: '5'
    })
    year: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_season",
        length: '5'
    })
    planningSeason: string;

    @Column('varchar', {
        nullable: true,
        name: "season",
        length: '5'
    })
    season: string;

    @Column('varchar', {
        nullable: true,
        name: "item_brand",
        length: '10'
    })
    itemBrand: string;

    @Column('varchar', {
        nullable: true,
        name: "business_unit",
        length: '4'
    })
    businessUnit: string;

    @Column('varchar', {
        nullable: true,
        name: "item_code",
        length: '6'

    })
    itemCode: string;

    @Column('varchar', {
        nullable: true,
        name: "itemName"
    })
    itemName: string;

    @Column('varchar', {
        nullable: true,
        name: "main_sample_code",
        length: '11'
    })
    mainSampleCode: string;

    @Column('varchar', {
        nullable: true,
        name: "main_sample_name"
    })
    mainSampleName: string;

    @Column('varchar', {
        nullable: true,
        name: "supplier_rm_code",
    })
    supplierRMCode: string;

    @Column('varchar', {
        nullable: true,
        name: "supplier_rm_name"
    })
    supplierRMName: string;

    @Column('varchar', {
        nullable: true,
        name: "vendor_code",
        length: 4
    })
    vendorCode: string;

    @Column('varchar', {
        nullable: true,
        name: "vendor_name",
    })
    vendorName: string;

    @Column('varchar', {
        nullable: true,
        name: "management_factory_code",
        length: 5
    })
    managementFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "management_factory_name"
    })
    managementFactoryName: string;

    @Column('varchar', {
        nullable: true,
        name: "branch_factory_code",
        length: 4
    })
    branchFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "branch_factory_name"
    })
    branchFactoryName: string;

    @Column('varchar', {
        nullable: true,
        name: "rm_supplier_code"
    })
    rmSupplierCode: string;

    @Column('varchar', {
        nullable: true,
        name: "rm_supplier_name",

    })
    rmSupplierName: string;

    @Column('decimal', {
        nullable: true,
        precision: 10,
        scale: 2,
        name: 'sewing_difficulty'
    })
    sewingDifficulty: number;

    @Column('varchar', {
        nullable: true,
        name: "department_code",
        length: 1
    })
    departmentCode: string;


    @Column('varchar', {
        nullable: true,
        name: "department_name",
        length: '12'
    })
    departmentName: string;

    @Column('varchar', {
        nullable: true,
        name: "class1_code",
        length: 2
    })
    class1Code: string;

    @Column('varchar', {
        nullable: true,
        name: "class1_name"
    })
    Class1Name: string;

    @Column('varchar', {
        nullable: true,
        name: "prod_plan_type_name",  // prodoction plan type name
        length: 20
    })
    productionPlanTypeName: string;

    @Column('boolean', {
        nullable: true,
        name: "month_week_flag"
    })
    monthWeekFlag: boolean;

    @Column('varchar', {
        nullable: true,
        name: "last_update_date",
        length: 10
    })
    lastUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "requested_wh_date",
        length: 10
    })
    requestedWhDate: string;

    @Column('varchar', {
        nullable: true,
        name: "contracted_date",
        length: 10
    })
    contractedDate: string;

    @Column('varchar', {
        nullable: true,
        name: "transport_method_name",
        length: 20
    })
    transportMethodName: string;

    @Column('varchar', {
        nullable: true,
        name: "logistics_type_name",
        length: 3
    })
    logisticsTypeName: string;

    @Column('int', {
        nullable: true,
        name: "order_qty_pcs",
    })
    orderQtyPcs: number;

    @Column('varchar', {
        nullable: true,
        name: "yarn_order_acceptance",
        length: 3
    })
    yarnOrderAcceptance: string;

    @Column('varchar', {
        nullable: true,
        name: "yarn_order_req_date",
        length: 10
    })
    yarnOrderRequestDate: string;

    @Column('varchar', {
        nullable: true,
        name: "yarn_order_ans_date",
        length: 10
    })
    yarnOrderAnswerDate: string;

    @Column('varchar', {
        nullable: true,
        name: "yarn_order_actual_ate",
        length: 10
    })
    yarnOrderActualDate: string;

    @Column('varchar', {
        nullable: true,
        name: "yarn_order_no",
        length: 21
    })
    yarnOrderNO: string;

    @Column('int', {
        nullable: true,
        name: "yarn_actual_order_qty_pcs"
    })
    yarnActualOrderQtyPcs: number;

    @Column('varchar', {
        nullable: true,
        name: "yarn_update_date",
        length: 10
    })
    yarnUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fabric_order_acceptance",
        length: 3
    })
    fabricOrderAcceptance: string;

    @Column('varchar', {
        nullable: true,
        name: "fabric_order_req_date",
        length: 10
    })
    fabricOrderRequestDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fabric_order_ans_date",
        length: 10
    })
    fabricOrderAnswerDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fabric_order_actual_date",
        length: 10
    })
    fabricOrderActualDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fabric_order_no",
        length: 21
    })
    fabricOrderNO: string;

    @Column('int', {
        nullable: true,
        name: "fabric_actual_order_qty_pcs"
    })
    fabricActualOrderQtyPcs: number;

    @Column('varchar', {
        nullable: true,
        name: "fabric_update_date",
        length: 10
    })
    fabricUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "color_order_acceptance",
        length: 3
    })
    colorOrderAcceptance: string;

    @Column('varchar', {
        nullable: true,
        name: "color_order_req_date",
        length: 10
    })
    colorOrderRequestDate: string;

    @Column('varchar', {
        nullable: true,
        name: "color_order_ans_date",
        length: 10
    })
    colorOrderAnswerDate: string;

    @Column('varchar', {
        nullable: true,
        name: "color_order_actual_date",
        length: 10
    })
    colorOrderActualDate: string;

    @Column('varchar', {
        nullable: true,
        name: "color_order_no",
        length: 20
    })
    colorOrderNO: string;

    @Column('int', {
        nullable: true,
        name: "color_actual_order_qty_pcs"
    })
    colorActualOrderQtyPcs: number;

    @Column('varchar', {
        nullable: true,
        name: "color_update_date",
        length: 10
    })
    colorUpdateDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_acceptance",
        length: 3
    })
    trimOrderAcceptance: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_req_date",
        length: 10
    })
    trimOrderRequestDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_ans_date",
        length: 10
    })
    trimOrderAnswerDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_actual_date",
        length: 10
    })
    trimOrderActualDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_no",
        length: 20
    })
    trimOrderNO: string;


    @Column('int', {
        nullable: true,
        name: "trim_actual_order_qty_pcs"
    })
    trimActualOrderQtyPcs: number;


    @Column('varchar', {
        nullable: true,
        name: "trim_update_date",
        length: 10
    })
    trimUpdateDate: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_acceptance",
        length: 3
    })
    POOrderAcceptance: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_req_date",
        length: 10
    })
    POOrderRequestDate: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_ans_date",
        length: 10
    })
    POOrderAnswerDate: string;

    @Column('varchar', {
        nullable: true,
        name: "po_order_actual_date",
        length: 10
    })
    POOrderActualDate: string;

    @Column('varchar', {
        nullable: true,
        name: "po_order_no",
        length: 16
    })
    POOrderNO: string;

    @Column('int', {
        nullable: true,
        name: "po_actual_order_qty_pcs"
    })
    POActualOrderQtyPcs: number;


    @Column('varchar', {
        nullable: true,
        name: "po_update_date",
        length: 10
    })
    POUpdateDate: string;


    @Column('int', {
        nullable: true,
        name: "order_qty_pcs_old"
    })
    orderQtyPcsOld: number;


    @Column('varchar', {
        nullable: true,
        name: "transport_method_name_old"
    })
    transportMethodNameOld: string;


    @Column('varchar', {
        nullable: true,
        name: "logistics_type_name_old"
    })
    logisticsTypeNameOld: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_order_req_date_old",
        length: 10
    })
    yarnOrderRequestDateOld: string;


    @Column('varchar', {
        nullable: true,
        name: "fabric_order_req_date_old",
        length: 10
    })
    fabricOrderRequestDateOld: string;


    @Column('varchar', {
        nullable: true,
        name: "color_order_req_date_old"
    })
    colorOrderRequestDateOld: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_req_date_old"
    })
    trimOrderRequestDateOld: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_req_date_old"
    })
    POOrderRequestDateOld: string;


    @Column('int', {
        nullable: true,
        name: "status"
    })
    status: string;

    @Column('varchar', {
        nullable: true,
        name: "display_month_wk",
        length: 15
    })
    displayMonthWK: string;

    @Column('int', {
        nullable: true,
        name: "display_month_wk_column"
    })
    displayMonthWKColumn: number;

    @Column('varchar', {
        nullable: true,
        name: "group_cd",
        length: 7
    })
    groupCd: string;

    @Column('int', {
        nullable: true,
        name: "show_color_flag"
    })
    showColorFlag: number;

    @Column('int', {
        nullable: true,
        name: "orderqty_coeff"
    })
    orderQtyCoeff: number;

    @Column('varchar', {
        nullable: true,
        name: "factory_comment"
    })
    factoryComment: string;

    @Column('varchar', {
        nullable: true,
        name: "factory_comment_update_date"
    })
    factoryCommentUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fr_fabric_code",
        length: 12
    })
    FRFabricCode: string;

    @Column('varchar', {
        nullable: true,
        name: "fr_fabric_name",
    })
    FRFabricName: string;

    @Column('varchar', {
        nullable: true,
        name: "ph1_first_disc_flag_old",
        length: 3
    })
    Ph1FirstDiscriminationFlagOld: string;

    @Column('varchar', {
        nullable: true,
        name: "ph1_first_disc_flag",
        length: 3
    })
    Ph1FirstDiscriminationFlag: string;

    @Column('varchar', {
        nullable: true,
        name: "order_timing_display_value_old",
        length: 6
    })
    orderTimingDisplayValueOld: string;


    @Column('varchar', {
        nullable: true,
        name: "order_timing_display_value",
        length: 6
    })
    orderTimingDisplayValue: string;

    @Column('varchar', {
        nullable: true,
        name: "express_line_flag_old",
        length: 3
    })
    expressLineFlagOld: string;


    @Column('varchar', {
        nullable: true,
        name: "express_line_flag",
        length: 3
    })
    expressLineFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "manual_lock_flag_old",
        length: 3
    })
    manualLockFlagOld: string;


    @Column('varchar', {
        nullable: true,
        name: "manual_lock_flag",
        length: 3
    })
    manualLockFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "ph1_first_disc_flag_now",
        length: 3
    })
    Ph1FirstDiscriminationFlagNow: string;


    @Column('varchar', {
        nullable: true,
        name: "order_timing_display_value_now",
        length: 6
    })
    orderTimingDisplayValueNow: string;


    @Column('varchar', {
        nullable: true,
        name: "express_line_flag_now",
        length: 2
    })
    expressLineFlagNow: string;


    @Column('varchar', {
        nullable: true,
        name: "manual_lock_flag_now",
        length: 2
    })
    ManualLockFlagNow: string;


    @Column('varchar', {
        nullable: true,
        name: "req_wh_date_old"
    })
    requestedWhDateOld: string;


    @Column('varchar', {
        nullable: true,
        name: "exf"
    })
    EXF: string;


    @Column('varchar', {
        nullable: true,
        name: "color_recommend"
    })
    colorRecommend: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_recommend"
    })
    trimRecommend: string;


    @Column('varchar', {
        nullable: true,
        name: "po_recommend"
    })
    PORecommend: string;


    @Column('int', {
        nullable: true,
        name: "bd_exf_dlsetting_ltbefore_cal"
    })
    BD_EXF_DLSettingLTBeforeCal: number;


    @Column('int', {
        nullable: true,
        name: "po_exf_dlsetting_ltbefore_cal"
    })
    PO_EXF_DLSettingLTBeforeCal: number;



    @Column('int', {
        nullable: true,
        name: "material_supl_holiday_excl"
    })
    materialSupplierHolidayExcluding: number;


    @Column('int', {
        nullable: true,
        name: "sewing_fty_holiday_excl"
    })
    sewingFTYHolidayExcluding: number;


    @Column('int', {
        nullable: true,
        name: "bd_exf_dlsetting_lt"
    })
    BD_EXF_DLSettingLT: number;


    @Column('int', {
        nullable: true,
        name: "po_exf_dlsetting_lt"
    })
    PO_EXF_DLSettingLT: number;


    @Column('int', {
        nullable: true,
        name: "bd_exf_reg_lt"
    })
    BD_EXFRegisteredLT: number;


    @Column('int', {
        nullable: true,
        name: "po_exf_reg_lt"
    })
    PO_EXFRegisteredLT: number;


    @Column('int', {
        nullable: true,
        name: "bd_exf_total_abnormal_lt"
    })
    BD_EXFtotalAbnormalLT: number;


    @Column('int', {
        nullable: true,
        name: "po_exf_total_abnormal_lt"
    })
    PO_EXFtotalAbnormalLT: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_bd1"
    })
    abnormalLTReasonBD1: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_bd2"
    })
    abnormalLTReasonBD2: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_bd3"
    })
    abnormalLTReasonBD3: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_bd4"
    })
    abnormalLTReasonBD4: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_bd5"
    })
    abnormalLTReasonBD5: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_bd1"
    })
    abnormalLTBD1: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_bd2"
    })
    abnormalLTBD2: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_bd3"
    })
    abnormalLTBD3: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_bd4"
    })
    abnormalLTBD4: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_bd5"
    })
    abnormalLTBD5: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_po1"
    })
    abnormalLTReasonPO1: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_po2"
    })
    abnormalLTReasonPO2: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_po3"
    })
    abnormalLTReasonPO3: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_po4"
    })
    abnormalLTReasonPO4: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_reason_po5"
    })
    abnormalLTReasonPO5: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_po1"
    })
    abnormalLTPO1: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_po2"
    })
    abnormalLTPO2: number;


    @Column('int', {
        nullable: true,
        name: "abnormal_lt_po3"
    })
    abnormalLTPO3: number;

    @Column('int', {
        nullable: true,
        name: "abnormal_lt_po4"
    })
    abnormalLTPO4: number;

    @Column('int', {
        nullable: true,
        name: "abnormal_lt_po5"
    })
    abnormalLTPO5: number;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @OneToMany(() => OrdersChildEntity, ordersChild => ordersChild.orders)
    ordersChild: OrdersChildEntity;
}