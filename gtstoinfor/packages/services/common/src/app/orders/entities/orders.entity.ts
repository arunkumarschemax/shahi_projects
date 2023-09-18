import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrdersChildEntity } from "./orders-child.entity";

@Entity('orders') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'production_plan_id',
    })
    productionPlanId: string

    @Column('varchar', {
        nullable: true,
        name: "year",
    })
    year: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_ssn_cd",
    })
    planningSsnCd: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_ssn",
    })
    planningSsn: string;

    @Column('varchar', {
        nullable: true,
        name: "tgt_ssn_cd",
    })
    tgtSsnCd: string;
   

    @Column('varchar', {
        nullable: true,
        name: "tgt_ssn",
    })
    tgtSsn: string;

    @Column('varchar', {
        nullable: true,
        name: "biz_cd",
        length: '4'
    })
    bizCd: string;

    @Column('varchar', {
        nullable: true,
        name: "biz",

    })
    biz: string;
    //h

    @Column('varchar', {
        nullable: true,
        name: "planning_region_code"
    })
    planningRegionCode: string;
    //i
    @Column('varchar', {
        nullable: true,
        name: "planning_region_name"
    })
    planningRegionName: string;
    //j

    @Column('varchar', {
        nullable: true,
        name: "channel_code",
    })
     channelCode: string;
    //k

    @Column('varchar', {
        nullable: true,
        name: "channel_code"
    })
    channelName: string;
    //l

    @Column('varchar', {
        nullable: true,
        name: "department",
    })
    department: string;
    //m
    @Column('varchar', {
        nullable: true,
        name: "dept_cd"
    })
    deptCd: string;
 //n
    @Column('varchar', {
        nullable: true,
        name: "cls1_cd",
    })
    Cls1_cd: string;
//o
    @Column('varchar', {
        nullable: true,
        name: "cls2_cd",
    })
    Cls2_cd: string;
//p
    @Column('varchar', {
        nullable: true,
        name: "g_dept",
    })
    gDept: string;
//q
    @Column('varchar', {
        nullable: true,
        name: "sub_category1"
    })
    subCategory1: string;
//r
    @Column('varchar', {
        nullable: true,
        name: "core_category",
        length: 4
    })
    coreCategory: string;
//s
    @Column('varchar', {
        nullable: true,
        name: "sub_category2"
    })
    subCategory2: string;
//t
    @Column('varchar', {
        nullable: true,
        name: "sub_category3"
    })
    subCategory3: string;

    @Column('varchar', {
        nullable: true,
        name: "production_category_fabric",

    })
    productionCategoryFabric: string;

    @Column('varchar', {
        nullable: true,
        name: 'production_category_fabric_processing'
    })
    productionCategoryFabricProcessing: string;

    @Column('varchar', {
        nullable: true,
        name: "production_category_sewing",
    })
    productionCategorySewing: string;
//x

    @Column('varchar', {
        nullable: true,
        name: "production_category_sewing_Processing",
        length: '12'
    })
    productionCategorySewingProcessing: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_sum_code",
        length: 2
    })
    planningSumCode: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_sum"
    })
    planningSum: string;
//aa
    @Column('varchar', {
        nullable: true,
        name: "local_name_ghq",  // prodoction plan type name
    })
    localNameGhq: string;
//ab
    @Column('varchar', {
        nullable: true,
        name: "item_cd"
    })
    itemCd: string;

    @Column('varchar', {
        nullable: true,
        name: "item",
        length: 10
    })
    item: string;

    // @Column('varchar', {
    //     nullable: true,
    //     name: "local_name_ghq",
    //     length: 10
    // })
    // localNameGhq: string;

    @Column('varchar', {
        nullable: true,
        name: "orig_price",
    })
    origPrice: string;
//af
    @Column('varchar', {
        nullable: true,
        name: "main_sample_code",
        length: 20
    })
    mainSampleCode: string;
//ag
    @Column('varchar', {
        nullable: true,
        name: "fr_fabric_code",
        length: 3
    })
    frFabricCode: string;

    @Column('varchar', {
        nullable: true,
        name: "fr_fabric",
    })
    frFabric: string;
//ai
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material_code",
    })
    supplierRawMaterialCode: string;
//aj
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material",
        length: 10
    })
    supplierRawMaterial: string;
//ak
    @Column('varchar', {
        nullable: true,
        name: "raw_material_supplier_code",
    })
    rawMaterialSupplierCode: string;
//al
    @Column('varchar', {
        nullable: true,
        name: "raw_material_supplier",
    })
    rawMaterialSupplier: string;
//am
    @Column('varchar', {
        nullable: true,
        name: "vendor_code",
    })
    vendorCoode: string;
//an -------------------------------------------------------------------------------------------------------------------------------------------------------
    @Column('varchar', {
        nullable: true,
        name: "vendor"
    })
    vendor: string;

    @Column('varchar', {
        nullable: true,
        name: "sewing_factory_code",
    })
    sewingFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "sewing_factory",
    })
    sewingFactory: string;
//aq
    @Column('varchar', {
        nullable: true,
        name: "branch_factory_code",
    })
    branchFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "branchFactory",
    })
    branchFactory: string;

    @Column('varchar', {
        nullable: true,
        name: "coeff",
    })
    coeff: string;

    @Column('int', {
        nullable: true,
        name: "item_branch_number",
    })
    itemBranchNumber: number;

    @Column('int', {
        nullable: true,
        name: "Official_plan_std_qty"
    })
    officialPlanStdQty: number;

    @Column('int', {
        nullable: true,
        name: "Official_plan_fab_prp_pln_qty",
    })
    OfficialPlanFabPrpPlnQty: number;
//aw
    @Column('varchar', {
        nullable: true,
        name: "Official_plan_po_pr_sls_qty",
    })
    OfficialPlanPoPrSlsQty: string;

    @Column('varchar', {
        nullable: true,
        name: "offical_plan_co_qty",
    })
    officalPlanCoQty: string;

    @Column('varchar', {
        nullable: true,
        name: "offical_plan_stock_qty",
    })
    officalPlanStockQty: string;
//BA
    @Column('varchar', {
        nullable: true,
        name: "sls_start_dy",
    })
    slsStartDy: string;

    @Column('varchar', {
        nullable: true,
        name: "publish_flag_for_factory",
    })
    publishFlagForFactory: string;

    @Column('varchar', {
        nullable: true,
        name: "publish_date"
    })
    publishDate: String;

    @Column('varchar', {
        nullable: true,
        name: "allc_end_dy",
    })
    allcEndDy: string;


    @Column('varchar', {
        nullable: true,
        name: "sls_end_dy",
    })
    slsEndDy: string;


    @Column('varchar', {
        nullable: true,
        name: "gwh",
    })
    GWH: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_number",
    })
    orderPlanNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "order_timing",
    })
    orderTiming: string;


    @Column('varchar', {
        nullable: true,
        name: "swng_prd_month",
    })
    swngPrdMonth: string;


    @Column('varchar', {
        nullable: true,
        name: "swng_prd_week"
    })
    swngPrdWeek: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty",
    })
    orderPlanQty: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty_coeff",
    })
    orderPlanQtyCoeff: string;


    @Column('varchar', {
        nullable: true,
        name: "trnsp_mthd",
    })
    trnspMthd: string;


    @Column('varchar', {
        nullable: true,
        name: "prod_plan_type",
    })
    prodPlanType: string;

    @Column('varchar', {
        nullable: true,
        name: "ph1_1st",
    })
    ph1St: string;

    @Column('varchar', {
        nullable: true,
        name: "wh",
    })
    wh: string;

    @Column('varchar', {
        nullable: true,
        name: "wh_act"
    })
    whAct: string;


    @Column('varchar', {
        nullable: true,
        name: "wh_auto",
    })
    whAuto: string;
//br

    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_requested"
    })
    yarnDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_answered"
    })
    yarnDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_auto"
    })
    yarnDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_production_due_date_auto",
    })
    yarnProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_auto_reflection_date",
    })
    yarnAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_act_dy"
    })
    yarnActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_act_qty"
    })
    yarnActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_order_number"
    })
    yarnOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_order_status"
    })
    yarnOrderStatus: string;
//CA
    @Column('varchar', {
        nullable: true,
        name: "yarn_delivery_date",
    })
    yarnDeliveryDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_requested"
    })
    fbrcDlRequested: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_answered",
    })
    fbrcDlAnswered: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_auto"
    })
    fbrcDlAuto: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_production_due_date_auto"
    })
    fbrcProductionDueDateAuto: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_auto_reflection_date"
    })
    fbrcAutoReflectionDate: string;

    @Column('varchar', {
        nullable: true,
        name: "factory_comment_update_date"
    })
    factoryCommentUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_act_dy",
    })
    fbrcActDy: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_act_qty",
    })
    fbrcActQty: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_order_number",
    })
    fbrcOrderNumber: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_order_status",
    })
    fbrcOrderStatus: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_delivery_date",
    })
    fbrcDeliveryDate: string;


    @Column('varchar', {
        nullable: true,
        name: "color_dl_requested",
    })
    colorDlRequested: string;

    @Column('varchar', {
        nullable: true,
        name: "color_dl_answered",
    })
    colorDlAnswered: string;
//CN

    @Column('varchar', {
        nullable: true,
        name: "color_dl_auto",
    })
    colorDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "color_production_due_date_auto",
    })
    colorProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "color_auto_reflection_date",
    })
    colorAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "color_act_dy",
    })
    colorActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "color_act_qty",
        length: 6
    })
    colorActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "color_order_number",
    })
    colorOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "color_order_status",
    })
    colorOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "color_delivery_date"
    })
    colorDeliveryDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_requested"
    })
    trimDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_answered"
    })
    trimDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_auto"
    })
    trimDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_production_due_date_auto"
    })
    trimProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_auto_reflection_date"
    })
    trimAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_act_dy"
    })
    trimActDy: string;



    @Column('varchar', {
        nullable: true,
        name: "trim_act_qty"
    })
    trimActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_number"
    })
    trimOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_status"
    })
    trimOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_delivery_date"
    })
    trimDeliveryDate: string ;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_requested"
    })
    poDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_answered"
    })
    poDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_auto"
    })
    poDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "po_exf_total_abnormal_lt"
    })
    PO_EXFtotalAbnormalLT: string;


    @Column('varchar', {
        nullable: true,
        name: "po_production_due_date_auto"
    })
    poProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "po_auto_reflection_date"
    })
    poAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "po_act_dy"
    })
    poActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "po_act_qty"
    })
    poActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_number"
    })
    poOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_status"
    })
    poOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "assort1"
    })
    assort1: string;


    @Column('varchar', {
        nullable: true,
        name: "assort2"
    })
    assort2: string;


    @Column('varchar', {
        nullable: true,
        name: "nx_assort"
    })
    nxAssort: string;


    @Column('varchar', {
        nullable: true,
        name: "solid"
    })
    solid: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty_stop"
    })
    orderPlanQtyStop: string;


    @Column('varchar', {
        nullable: true,
        name: "fix_flag"
    })
    fixFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "alternative_flag"
    })
    alternativeFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "express_line_flag"
    })
    expressLineFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "factory_comment"
    })
    factoryComment: string;


    @Column('varchar', {
        nullable: true,
        name: "planned_exf"
    })
    plannedEXF: string;


    @Column('varchar', {
        nullable: true,
        name: "exf_etd"
    })
    exfEtd: string;


    @Column('varchar', {
        nullable: true,
        name: "exf_wh"
    })
    exfWh: string;

    @Column('varchar', {
        nullable: true,
        name: "sweing_country_region"
    })
    sweingCountryRegion: string;

    @Column('varchar', {
        nullable: true,
        name: "rew_material_original"
    })
    rewMaterialOriginal: string;

    @Column('varchar', {
        name: 'item_drop',
        nullable: true
    })
    itemDrop: string;

    @Column('varchar', {
        nullable: true,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        name: 'version',
    })
    version: string;

    @OneToMany(() => OrdersChildEntity, (ordersChild) => { ordersChild.orders }, { cascade: true })
    ordersChild: OrdersChildEntity;

    @Column('varchar', {
        nullable:true,
        name: 'file_id',
    })
    fileId : string;

    @Column('varchar', {
        nullable:true,
        name: 'month',
    })
    month : string;
     
    @Column('varchar', {
        nullable:true,
        name: 'created_user_id',
    })
    createdUserId : string;

    @Column('varchar', {
        nullable:true,
        name: 'created_user_name',
    })
    createdUserName : string;

    @Column('varchar', {
        nullable:true,
        name: 'create_function',
    })
    createFunction : string;

    @Column('varchar', {
        nullable:true,
        name: 'updated_user_id',
    })
    updatedUserId : string;

    @Column('varchar', {
        nullable:true,
        name: 'updated_user_name',
    })
    updatedUserName : string;


    @Column('varchar', {
        nullable:true,
        name: 'updated_user_function',
    })
    updatedUserFunction : string;

    @Column('varchar', {
        nullable:true,
        name: 'count_y',
    })
    countY : string;


    @Column('varchar', {
        nullable:true,
        name: 'sample',
    })
    sample : string;


    @Column('varchar', {
        nullable:true,
        name: 'exf',
    })
    exf : string;


    @Column('varchar', {
        nullable:true,
        name: 'bddl',
    })
    bddl : string;

    @Column('varchar', {
        nullable:true,
        name: 'bddl_past',
    })
    bddlPast : string;

    @Column('varchar', {
        nullable:true,
        name: 'lt_bd_exf',
    })
    ltBdExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'new_bddl',
    })
    newBddl : string;

    @Column('varchar', {
        nullable:true,
        name: 'new_lt_bd_exf',
    })
    newLtBdExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'lt_po_exf',
    })
    ltPoExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'qty_lt__bd_exf',
    })
    qtyLtBdExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'qty_lt__po_exf',
    })
    qtyLtPoExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'country2_y',
    })
    country2Y : string;

    @Column('varchar', {
        nullable:true,
        name: 'phase',
    })
    phase : string;

   
}