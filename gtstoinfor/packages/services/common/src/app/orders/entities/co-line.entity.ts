import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('co_line') //change the name
export class COLineEntity {

    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        name: "buyer",
        length: 50
    })
    buyer: string;

    @Column('varchar', {
        nullable: false,
        name: "buyer_po",
        length: 15
    })
    buyerPo: string;

    @Column('int', {
        nullable: true,
        name: "line_item_no",
    })
    lineItemNo: number;

    @Column('varchar', {
        nullable: true,
        name: "buyer_style",
        length: 15
    })
    buyerStyle: string;

    @Column('varchar', {
        nullable: true,
        name: "item_no",
        length: 4
    })
    itemNo: string;

    @Column('varchar', {
        nullable: true,
        name: "co_number",
        length: 15
    })
    coNumber: string;

    @Column('varchar', {
        nullable: true,
        name: "co_date",
        length: 10
    })
    coDate: string;

    @Column('varchar', {
        nullable: true,
        name: "status",
        length: 15
    })
    status: string;

    @Column('varchar', {
        nullable: true,
        name: "error_msg",
        length: 50
    })
    errorMsg: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "updated_user",
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    @Column({
        nullable: false,
        name: "is_active",
        default: 1
    })
    isActive: boolean;
}


// import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// @Entity('co_line') //change the name
// export class CoLine {

//     @PrimaryGeneratedColumn('increment', {
//         name: 'co_line_id',
//     })
//     coLineId: number

//     @Column('varchar',{
//         name:'item_number',
//         nullable:false
//     })
//     itemNumber : string;

//     @Column('varchar',{
//         name:'order_number',
//         nullable:false

//     })
//     orderNumber:string;

//     @Column('varchar',{
//         name:'color_code',
//         nullable:false

//     })
//     colorCode:string;

//     @Column('varchar',{
//         name:'color',
//         nullable:false

//     })
//     color: string;

//     @Column('varchar',{
//         name:'size_code',
//         nullable:false

//     })
//     sizeCode:string;

//     @Column('varchar',{
//         name:'size',
//         nullable:false

//     })
//     size: string;

//     @Column('varchar',{
//         name:'item_code',
//         nullable:false

//     })
//     itemCode:string;

//     @Column('varchar',{
//         name:'item',
//         nullable:false

//     })
//     item:string;

//     @Column('varchar',{
//         name:'destination',
//         nullable:true
//     })
//     destination:string;

//     @Column('int',{
//         name:'company_CONO',
//         nullable:true
//     })
//     company_CONO : number;

//     @Column('varchar',{
//         name:'temporary_order_number_ORNO',
//         nullable:true
//     })
//     temporaryOrderNumber_ORNO : string;

//     @Column('varchar',{
//         name:'item_number_ITNO',
//         nullable:true
//     })
//     itemNumber_ITNO : string;

//     @Column('varchar',{
//         name:'ordered_quantity_ORQT',
//         nullable:true
//     })
//     orderedQuantity_ORQT : string;

//     @Column('varchar',{
//         name:'warehouse_WHLO',
//         nullable:true
//     })
//     warehouse_WHLO : string;

//     @Column('varchar',{
//         name:'requested_delivery_date_DWDT',
//         nullable:true
//     })
//     requestedDeliveryDate_DWDT : string;

//     @Column('varchar',{
//         name:'joint_delivery_date_JDCD',
//         nullable:true
//     })
//     jointDeliveryDate_JDCD: string;

//     @Column('varchar',{
//         name:'customers_order_number_CUPO',
//         nullable:true
//     })
//     customersOrderNumber_CUPO :  string;

//     @Column('int',{
//         name:'sales_price_SAPR',
//         nullable:true
//     })
//     salesPrice_SAPR : number;

//     @Column('int',{
//         name:'discount_amount1_DIA1',
//         nullable:true
//     })
//     discountAmount1_DIA1 : number;

//     @Column('int',{
//         name:'discount_amount2_DIA2',
//         nullable:true
//     })
//     discountAmount2_DIA2 : number;

//     @Column('int',{
//         name:'discount_amount3_DIA3',
//         nullable:true
//     })
//     discountAmount3_DIA3 : number;

//     @Column('int',{
//         name:'discount_amount4_DIA4',
//         nullable:true
//     })
//     discountAmount4_DIA4 : number;

//     @Column('int',{
//         name:'discount_amount5_DIA5',
//         nullable:true
//     })
//     discountAmount5_DIA5 : number;

//     @Column('int',{
//         name:'discount_amount6_DIA6',
//         nullable:true
//     })
//     discountAmount6_DIA6 : number;

//     @Column('varchar',{
//         name:'delivery_specification_DLSP',
//         nullable:true
//     })
//     deliverySpecification_DLSP: string;

//     @Column('varchar',{
//         name:'delivery_specification_text_DLSX',
//         nullable:true
//     })
//     deliverySpecificationText_DLSX : string;

//     @Column('int',{
//         name:'old_CFIN_CFXX',
//         nullable:true
//     })
//     oldCFIN_CFXX : number;

//     @Column('int',{
//         name:'simulations_number_ECVS',
//         nullable:true
//     })
//     simulationsNumber_ECVS : number;

//     @Column('varchar',{
//         name:'alternateUM_ALUN',
//         nullable:true
//     })
//     alternateUM_ALUN: string;

//     @Column('varchar',{
//         name:'confirmed_date_of_delivery_CODT',
//         nullable:true
//     })
//     confirmedDateOfDelivery_CODT : string;

//     @Column('varchar',{
//         name:'item_description_ITDS',
//         nullable:true
//     })
//     itemDescription_ITDS: string;

//     @Column('int',{
//         name:'discount_percent1_DIP1',
//         nullable:true
//     })
//     discountPercent1_DIP1: number;

//     @Column('int',{
//         name:'discount_percent2_DIP2',
//         nullable:true
//     })
//     discountPercent2_DIP2: number;

//     @Column('int',{
//         name:'discount_percent3_DIP3',
//         nullable:true
//     })
//     discountPercent3_DIP3: number;

//     @Column('int',{
//         name:'discount_percent4_DIP4',
//         nullable:true
//     })
//     discountPercent4_DIP4: number;

//     @Column('int',{
//         name:'discount_percent5_DIP5',
//         nullable:true
//     })
//     discountPercent5_DIP5: number;

//     @Column('int',{
//         name:'discount_percent6_DIP6',
//         nullable:true
//     })
//     discountPercent6_DIP6: number;

//     @Column('int',{
//         name:'alias_qualifier_ALWT',
//         nullable:true
//     })
//     aliasQualifier_ALWT: number;

//     @Column('int',{
//         name:'alias_qualifier_ALWQ',
//         nullable:true
//     })
//     aliasQualifier_ALWQ: number;

//     @Column('varchar',{
//         name:'blanket_agreement_number_AGNO',
//         nullable:true
//     })
//     blanketAgreementNumber_AGNO : string;

//     @Column('varchar',{
//         name:'container_CAMU',
//         nullable:true
//     })
//     container_CAMU : string;

//     @Column('varchar',{
//         name:'project_number_PROJ',
//         nullable:true
//     })
//     projectNumber_PROJ: string;

//     @Column('varchar',{
//         name:'project_element_ELON',
//         nullable:true
//     })
//     projectElement_ELON: string;

//     @Column('varchar',{
//         name:'customer_order_number_CUOR',
//         nullable:true
//     })
//     customerOrderNumber_CUOR : string;

//     @Column('varchar',{
//         name:'customers_packaging_identity_CUPA',
//         nullable:true
//     })
//     customersPackagingIdentity_CUPA :string;

//     @Column('int',{
//         name:'requested_delivery_time_DWHM',
//         nullable:true
//     })
//     requestedDeliveryTime_DWHM: number;

//     @Column('int',{
//         name:'standard_quantity_D1QT',
//         nullable:true
//     })
//     standardQuantity_D1QT: number;

//     @Column('varchar',{
//         name:'packaging_PACT',
//         nullable:true
//     })
//     packaging_PACT: string;

//     @Column('varchar',{
//         name:'alias_number_POPN',
//         nullable:true
//     })
//     aliasNumber_POPN: string;

//     @Column('int',{
//         name:'sales_price_quantity_SACD',
//         nullable:true
//     })
//     salesPriceQuantity_SACD: number;

//     @Column('varchar',{
//         name:'saled_price_UOM_SPUN',
//         nullable:true
//     })
//     saledPriceUOM_SPUN : string;

//     @Column('varchar',{
//         name:'packaging_terms_TEPA',
//         nullable:true
//     })
//     packagingTerms_TEPA : string;

//     @Column('int',{
//         name:'EDIFACT_Price_EDFP',
//         nullable:true
//     })
//     EDIFACTPrice_EDFP : number;

//     @Column('int',{
//         name:'requested_delivery_date_DWDZ',
//         nullable:true
//     })
//     requestedDeliveryDate_DWDZ : number;

//     @Column('int',{
//         name:'requested_delivery_time_DWHZ',
//         nullable:true
//     })
//     requestedDeliveryTime_DWHZ : number;

//     @Column('int',{
//         name:'confirmed_delivery_time_COHM',
//         nullable:true
//     })
//     confirmedDeliveryTime_COHM : number;

//     @Column('varchar',{
//         name:'confirmed_delivery_date_CODZ',
//         nullable:true
//     })
//     confirmedDeliveryDate_CODZ : string;

//     @Column('int',{
//         name:'confirmed_delivery_time_COHZ',
//         nullable:true
//     })
//     confirmedDeliveryTime_COHZ : number;

//     @Column('varchar',{
//         name:'main_product_HDPR',
//         nullable:true
//     })
//     mainProduct_HDPR : string;

//     @Column('varchar',{
//         name:'address_number_ADID',
//         nullable:true
//     })
//     addressNumber_ADID : string;

//     @Column('int',{
//         name:'line_suffix_CUSX',
//         nullable:true
//     })
//     lineSuffix_CUSX : number;

//     @Column('int',{
//         name:'status_discount_DICI',
//         nullable:true
//     })
//     statusDiscount_DICI : number;

//     @Column('int',{
//         name:'trim_order_id',
//         nullable:false
//     })
//     trimOrderId : number;

//     @Column('varchar', {
//         nullable: true,
//         length: 40,
//         name: 'created_user'
//     })
//     createdUser: string | null;

//     @Column('varchar', {
//         nullable: true,
//         length: 40,
//         name: 'updated_user'
//     })
//     updatedUser: string | null;

//     @CreateDateColumn({
//         name: 'created_at'
//     })
//     createdAt: string;

//     @UpdateDateColumn({
//         name: 'updated_at'
//     })
//     updatedAt: string;

//     @Column("varchar", {
//         nullable: true,
//         name: "status"
//     })
//     status: string;


// }