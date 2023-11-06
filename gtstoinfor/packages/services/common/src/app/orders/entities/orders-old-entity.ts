import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrdersChildEntity } from "./orders-child.entity";

@Entity('orders') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'production_plan_id',
    })
    productionPlanId: number

    @Column('varchar', {
        nullable: true,
        name: "year",
        length:50
        
    })
    year: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_ssn_cd",
        length:50
        

    })
    planningSsnCd: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_ssn",
        length:50
        

    })
    planningSsn: string;

    @Column('varchar', {
        nullable: true,
        name: "tgt_ssn_cd",
        length:50
        

    })
    tgtSsnCd: string;
   

    @Column('varchar', {
        nullable: true,
        name: "tgt_ssn",
        length:50
        

    })
    tgtSsn: string;

    @Column('varchar', {
        nullable: true,
        name: "biz_cd",
        length:50
        

    })
    bizCd: string;

    @Column('varchar', {
        nullable: true,
        name: "biz",
        length:50
        

    })
    biz: string;
    //h

    @Column('varchar', {
        nullable: true,
        name: "planning_region_code",
        length:50
        

    })
    planningRegionCode: string;
    //i
    @Column('varchar', {
        nullable: true,
        name: "planning_region_name",
        length:50
        

    })
    planningRegionName: string;
    //j

    @Column('varchar', {
        nullable: true,
        name: "channel_code",
        length:50
        

    })
     channelCode: string;
    //k

    @Column('varchar', {
        nullable: true,
        name: "channel_name",
        length:50
        


    })
    channelName: string;

    //l

    @Column('varchar', {
        nullable: true,
        name: "department",
        length:50
        

    })
    department: string;
    //m
    @Column('varchar', {
        nullable: true,
        name: "dept_cd",
        length:50
        

    })
    deptCd: string;
 //n
    @Column('varchar', {
        nullable: true,
        name: "cls1_cd",
        length:50
        

    })
    Cls1_cd: string;
//o
    @Column('varchar', {
        nullable: true,
        name: "cls2_cd",
        length:50
        

    })
    Cls2_cd: string;
//p
    @Column('varchar', {
        nullable: true,
        name: "g_dept",
        length:50
        

    })
    gDept: string;
//q
    @Column('varchar', {
        nullable: true,
        name: "sub_category1",
        length:50
        

    })
    subCategory1: string;
//r
    @Column('varchar', {
        nullable: true,
        name: "core_category",
        length:50
        
        })
    coreCategory: string;
//s
    @Column('varchar', {
        nullable: true,
        name: "sub_category2",
        length:50
        

    })
    subCategory2: string;
//t
    @Column('varchar', {
        nullable: true,
        name: "sub_category3",
        length:50
        

    })
    subCategory3: string;

    @Column('varchar', {
        nullable: true,
        name: "production_category_fabric",
        length:50
        


    })
    productionCategoryFabric: string;

    @Column('varchar', {
        nullable: true,
        name: 'production_category_fabric_processing',
        length:50
        

    })
    productionCategoryFabricProcessing: string;

    @Column('varchar', {
        nullable: true,
        name: "production_category_sewing",
        length:50
        

    })
    productionCategorySewing: string;
//x

    @Column('varchar', {
        nullable: true,
        name: "production_category_sewing_Processing",
        length:50
        
    })
    productionCategorySewingProcessing: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_sum_code",
        length:50
        
    })
    planningSumCode: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_sum",
        length:50
        

    })
    planningSum: string;
//aa
    @Column('varchar', {
        nullable: true,
        name: "local_name_ghq", 
        length:50
        
        // prodoction plan type name
    })
    localNameGhq: string;
//ab
    @Column('varchar', {
        nullable: true,
        name: "item_cd",
        length:50
        


    })
    itemCd: string;

    @Column('varchar', {
        nullable: true,
        name: "item",
        length:50
        
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
        length:50
        

    })
    origPrice: string;
//af
    @Column('varchar', {
        nullable: true,
        name: "main_sample_code",
        length:50
        
    })
    mainSampleCode: string;
//ag
    @Column('varchar', {
        nullable: true,
        name: "fr_fabric_code",
        length:50
        
    })
    frFabricCode: string;

    @Column('varchar', {
        nullable: true,
        name: "fr_fabric",
        length:50
        

    })
    frFabric: string;
//ai
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material_code",
        length:50
        

    })
    supplierRawMaterialCode: string;
//aj
    @Column('varchar', {
        nullable: true,
        name: "supplier_raw_material",
        length:50
        
    })
    supplierRawMaterial: string;
//ak
    @Column('varchar', {
        nullable: true,
        name: "raw_material_supplier_code",
        length:50
        

    })
    rawMaterialSupplierCode: string;
//al
    @Column('varchar', {
        nullable: true,
        name: "raw_material_supplier",
        length:50
        

    })
    rawMaterialSupplier: string;
//am
    @Column('varchar', {
        nullable: true,
        name: "vendor_code",
        length:50
        

    })
    vendorCoode: string;
//an -------------------------------------------------------------------------------------------------------------------------------------------------------
    @Column('varchar', {
        nullable: true,
        name: "vendor",
        length:50
        

    })
    vendor: string;

    @Column('varchar', {
        nullable: true,
        name: "sewing_factory_code",
        length:50
        

    })
    sewingFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "sewing_factory",
        length:50
        

    })
    sewingFactory: string;
//aq
    @Column('varchar', {
        nullable: true,
        name: "branch_factory_code",
        length:50
        

    })
    branchFactoryCode: string;

    @Column('varchar', {
        nullable: true,
        name: "branchFactory",
        length:50
        

    })
    branchFactory: string;

    @Column('varchar', {
        nullable: true,
        name: "coeff",
        length:50
        

    })
    coeff: string;

    @Column('int', {
        nullable: true,
        name: "item_branch_number",
    })
    itemBranchNumber: number;

    @Column('int', {
        nullable: true,
        name: "official_plan_std_qty"
    })
    officialPlanStdQty: number;

    @Column('int', {
        nullable: true,
        name: "official_plan_fab_prp_pln_qty",


    })
    OfficialPlanFabPrpPlnQty: number;
//aw
    @Column('varchar', {
        nullable: true,
        name: "official_plan_po_pr_sls_qty",
        length:50
        

    })
    OfficialPlanPoPrSlsQty: string;

    @Column('varchar', {
        nullable: true,
        name: "offical_plan_co_qty",
        length:50
        

    })
    officalPlanCoQty: string;
    

    @Column('varchar', {
        nullable: true,
        name: "offical_plan_stock_qty",
        length:50
        

    })
    officalPlanStockQty: string;
//BA
    @Column('varchar', {
        nullable: true,
        name: "sls_start_dy",
        length:50
        

    })
    slsStartDy: string;

    @Column('varchar', {
        nullable: true,
        name: "publish_flag_for_factory",
        length:50
        

    })
    publishFlagForFactory: string;

    @Column('varchar', {
        nullable: true,
        name: "publish_date",
        length:50
        

    })
    publishDate: String;

    @Column('varchar', {
        nullable: true,
        name: "allc_end_dy",
        length:50
        

    })
    allcEndDy: string;


    @Column('varchar', {
        nullable: true,
        name: "sls_end_dy",
        length:50
        

    })
    slsEndDy: string;


    @Column('varchar', {
        nullable: true,
        name: "gwh",
        length:50
        

    })
    GWH: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_number",
        length:50
        

    })
    orderPlanNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "order_timing",
        length:50
        

    })
    orderTiming: string;


    @Column('varchar', {
        nullable: true,
        name: "swng_prd_month",
        length:50
        

    })
    swngPrdMonth: string;


    @Column('varchar', {
        nullable: true,
        name: "swng_prd_week",
        length:50
        


    })
    swngPrdWeek: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty",
        length:50
        

    })
    orderPlanQty: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty_coeff",
        length:50
        

    })
    orderPlanQtyCoeff: string;


    @Column('varchar', {
        nullable: true,
        name: "trnsp_mthd",
        length:50
        

    })
    trnspMthd: string;


    @Column('varchar', {
        nullable: true,
        name: "prod_plan_type",
        length:50
        

    })
    prodPlanType: string;

    @Column('varchar', {
        nullable: true,
        name: "ph1_1st",
        length:50
        

    })
    ph1St: string;

    @Column('varchar', {
        nullable: true,
        name: "wh",
        length:50
        

    })
    wh: string;

    @Column('varchar', {
        nullable: true,
        name: "wh_act",
        length:50
        

    })
    whAct: string;


    @Column('varchar', {
        nullable: true,
        name: "wh_auto",
        length:50
        

    })
    whAuto: string;
//br

    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_requested",
        length:50
        

    })
    yarnDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_answered",
        length:50
    })
    yarnDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_dl_auto",
        length:50
        

    })
    yarnDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_production_due_date_auto",
        length:50
        

    })
    yarnProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_auto_reflection_date",
        length:50
        

    })
    yarnAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_act_dy",
        length:50
        

    })
    yarnActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_act_qty",
        length:50
        

    })
    yarnActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_order_number",
        length:50
        

    })
    yarnOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "yarn_order_status",
        length:50
        

    })
    yarnOrderStatus: string;
//CA
    @Column('varchar', {
        nullable: true,
        name: "yarn_delivery_date",
        length:50
        

    })
    yarnDeliveryDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_requested",
        length:50
        

    })
    fbrcDlRequested: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_answered",
        length:50
        

    })
    fbrcDlAnswered: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_dl_auto",
        length:50
        

    })
    fbrcDlAuto: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_production_due_date_auto",
        length:50
        

    })
    fbrcProductionDueDateAuto: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_auto_reflection_date",
        length:50
        

    })
    fbrcAutoReflectionDate: string;

    @Column('varchar', {
        nullable: true,
        name: "factory_comment_update_date",
        length:50
        

    })
    factoryCommentUpdateDate: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_act_dy",
        length:50
        

    })
    fbrcActDy: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_act_qty",
        length:50
        

    })
    fbrcActQty: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_order_number",
        length:50
        

    })
    fbrcOrderNumber: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_order_status",
        length:50
        

    })
    fbrcOrderStatus: string;

    @Column('varchar', {
        nullable: true,
        name: "fbrc_delivery_date",
        length:50
        

    })
    fbrcDeliveryDate: string;


    @Column('varchar', {
        nullable: true,
        name: "color_dl_requested",
        length:50
        

    })
    colorDlRequested: string;

    @Column('varchar', {
        nullable: true,
        name: "color_dl_answered",
        length:50
        

    })
    colorDlAnswered: string;
//CN

    @Column('varchar', {
        nullable: true,
        name: "color_dl_auto",
        length:50
        

    })
    colorDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "color_production_due_date_auto",
        length:50
        

    })
    colorProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "color_auto_reflection_date",
        length:50
        

    })
    colorAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "color_act_dy",
        length:50
        

    })
    colorActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "color_act_qty",
        length:50
    })
    colorActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "color_order_number",
        length:50
        

    })
    colorOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "color_order_status",
        length:50
        

    })
    colorOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "color_delivery_date",
        length:50
        

    })
    colorDeliveryDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_requested",
        length:50
        

    })
    trimDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_answered",
        length:50
        

    })
    trimDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_dl_auto",
        length:50
        

    })
    trimDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_production_due_date_auto",
        length:50
        

    })
    trimProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_auto_reflection_date",
        length:50
        

    })
    trimAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_act_dy",
        length:50
        

    })
    trimActDy: string;



    @Column('varchar', {
        nullable: true,
        name: "trim_act_qty",
        length:50
        

    })
    trimActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_number",
        length:50
        

    })
    trimOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_order_status",
        length:50
        

    })
    trimOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "trim_delivery_date",
        length:50
        

    })
    trimDeliveryDate: string ;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_requested",
        length:50
        

    })
    poDlRequested: string;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_answered",
        length:50
        

    })
    poDlAnswered: string;


    @Column('varchar', {
        nullable: true,
        name: "po_dl_auto",
        length:50
        

    })
    poDlAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "po_exf_total_abnormal_lt",
        length:50
        

    })
    PO_EXFtotalAbnormalLT: string;


    @Column('varchar', {
        nullable: true,
        name: "po_production_due_date_auto",
        length:50
        

    })
    poProductionDueDateAuto: string;


    @Column('varchar', {
        nullable: true,
        name: "po_auto_reflection_date",
        length:50
        

    })
    poAutoReflectionDate: string;


    @Column('varchar', {
        nullable: true,
        name: "po_act_dy",
        length:50
        

    })
    poActDy: string;


    @Column('varchar', {
        nullable: true,
        name: "po_act_qty",
        length:50
        

    })
    poActQty: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_number",
        length:50
        

    })
    poOrderNumber: string;


    @Column('varchar', {
        nullable: true,
        name: "po_order_status",
        length:50

    })
    poOrderStatus: string;


    @Column('varchar', {
        nullable: true,
        name: "assort1",
        length:50

    })
    assort1: string;


    @Column('varchar', {
        nullable: true,
        name: "assort2",
        length:50

    })
    assort2: string;


    @Column('varchar', {
        nullable: true,
        name: "nx_assort",
        length:50

    })
    nxAssort: string;


    @Column('varchar', {
        nullable: true,
        name: "solid",
        length:50

    })
    solid: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty_stop",
        length:50

    })
    orderPlanQtyStop: string;


    @Column('varchar', {
        nullable: true,
        name: "fix_flag",
        length:50

    })
    fixFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "alternative_flag",
        length:50

    })
    alternativeFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "express_line_flag",
        length:50

    })
    expressLineFlag: string;


    @Column('varchar', {
        nullable: true,
        name: "factory_comment",
        length:50

    })
    factoryComment: string;


    @Column('varchar', {
        nullable: true,
        name: "planned_exf",
        length:50

    })
    plannedEXF: string;


    @Column('varchar', {
        nullable: true,
        name: "exf_etd",
        length:50

    })
    exfEtd: string;


    @Column('varchar', {
        nullable: true,
        name: "exf_wh",
        length:50

    })
    exfWh: string;

    @Column('varchar', {
        nullable: true,
        name: "sweing_country_region",
        length:50

    })
    sweingCountryRegion: string;

    @Column('varchar', {
        nullable: true,
        name: "rew_material_original",
        length:50

    })
    rewMaterialOriginal: string;

    @Column('varchar', {
        name: 'item_drop',
        length:50,
        nullable: true

    })
    itemDrop: string;

    @Column('varchar', {
        nullable: true,
        name: 'created_user',
        length:50

    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        
        name: 'updated_user',
        length:50

    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at',
 

    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at',

    })
    updatedAt: string;

    @Column('int', {
        nullable: true,
        name: 'version',


    })
    version: number;

    @OneToMany(() => OrdersChildEntity, (ordersChild) => { ordersChild.orders }, { cascade: true })
    ordersChild: OrdersChildEntity;

    @Column('int', {
        nullable:true,
        name: 'file_id',

    })
    fileId : number;

     
    @Column('varchar', {
        nullable:true,
        name: 'created_user_id',
        length:50

    })
    createdUserId : string;

    @Column('varchar', {
        nullable:true,
        name: 'created_user_name',
        length:50

    })
    createdUserName : string;

    @Column('varchar', {
        nullable:true,
        name: 'create_function',
        length:50

    })
    createFunction : string;

    @Column('varchar', {
        nullable:true,
        name: 'updated_user_id',
        length:50

    })
    updatedUserId : string;

    @Column('varchar', {
        nullable:true,
        name: 'updated_user_name',
        length:50

    })
    updatedUserName : string;


    @Column('varchar', {
        nullable:true,
        name: 'updated_user_function',
        length:50

    })
    updateFunction : string;

    @Column('varchar', {
        nullable:true,
        name: 'count_y',
        length:50

    })
    countY : string;


    @Column('varchar', {
        nullable:true,
        name: 'sample',
        length:50

    })
    sample : string;


    @Column('varchar', {
        nullable:true,
        name: 'exf',
        length:50

    })
    exf : string;


    @Column('varchar', {
        nullable:true,
        name: 'bddl',
        length:50
    })
    bddl : string;

    @Column('varchar', {
        nullable:true,
        name: 'bddl_past',
        length:50
    })
    bddlPast : string;

    @Column('varchar', {
        nullable:true,
        name: 'lt_bd_exf',
        length:50
    })
    ltBdExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'new_bddl',
        length:50
    })
    newBddl : string;

    @Column('varchar', {
        nullable:true,
        name: 'new_lt_bd_exf',
        length:50
    })
    newLtBdExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'lt_po_exf',
        length:50
    })
    ltPoExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'qty_lt_bd_exf',
        length:50
    })
    qtyLtBdExf : string;

    @Column('int',{
        nullable:true,
        name:'month',
    })
month :number
    @Column('varchar', {
        nullable:true,
        name: 'qty_lt_po_exf',
        length:50
    })
    qtyLtPoExf : string;

    @Column('varchar', {
        nullable:true,
        name: 'country2_y',
        length:50
    })
    country2Y : string;

    @Column('varchar', {
        nullable:true,
        name: 'phase',
        length:50
    })
    phase : string;

    @Column('datetime',{
        name:'create_date'
    })
    createDate:Date

    @Column('datetime',{
        name:'update_date'
    })
    updateDate:Date

   
}