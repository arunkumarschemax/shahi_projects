import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm";
import { DpomChildEntity } from "./dpom-child.entity";

@Entity('dpom')
export class DpomEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column('date', {
        name: "document_date",
    })
    documentDate: string;

    @Column('varchar', {
        name: "po_number",
        length: 20,
    })
    purchaseOrderNumber: string;

    @Column('int', {
        name: "po_line_item_number",
    })
    poLineItemNumber: number;

    @Column('varchar', {
        name: "schedule_line_item_number",
        length: 5
    })
    scheduleLineItemNumber: string;

    @Column("varchar", {
        name: "category_code",
        length: 10,
        nullable: true
    })
    categoryCode: string;

    @Column("varchar", {
        name: "category_desc",
        length: 100,
        nullable: true,
    })
    categoryDesc: string;

    @Column("varchar", {
        name: "vendor_code",
        length: 10,
        nullable: true
    })
    vendorCode: string;

    @Column("varchar", {
        name: "gcc_focus_code",
        length: 10,
        nullable: true
    })
    gccFocusCode: string;

    @Column("varchar", {
        name: "gcc_focus_desc",
        length: 100,
        nullable: true,
    })
    gccFocusDesc: string;

    @Column("varchar", {
        name: "gender_age_code",
        length: 5,
        nullable: true
    })
    genderAgeCode: string;

    @Column("varchar", {
        name: "gender_age_desc",
        length: 15,
        nullable: true
    })
    genderAgeDesc: string;

    @Column("varchar", {
        name: "style_number",
        length: 10,
        nullable: true
    })
    styleNumber: string;

    @Column("varchar", {
        name: "product_code",
        length: 15,
        nullable: true
    })
    productCode: string;

    @Column("varchar", {
        name: "color_desc",
        length: 50,
        nullable: true
    })
    colorDesc: string;

    @Column("varchar", {
        name: "destination_country_code",
        length: 6,
        nullable: true
    })
    destinationCountryCode: string;

    @Column("varchar", {
        name: "destination_country",
        length: 15,
        nullable: true
    })
    destinationCountry: string;

    @Column("varchar", {
        name: "plant",
        length: 10,
        nullable: true
    })
    plant: string;

    @Column("varchar", {
        name: "plant_name",
        length: 50,
        nullable: true
    })
    plantName: string;

    @Column("varchar", {
        name: "trading_co_po_no",
        length: 15,
        nullable: true
    })
    tradingCoPoNumber: string;

    @Column("varchar", {
        name: "upc",
        length: 20,
        nullable: true
    })
    UPC: string;

    @Column("varchar", {
        name: "direct_ship_so_no",
        length: 15,
        nullable: true
    })
    directShipSONumber: string;

    @Column("varchar", {
        name: "direct_ship_so_item_no",
        length: 10,
        nullable: true
    })
    directShipSOItemNumber: string;

    @Column("varchar", {
        name: "customer_po",
        length: 50,
        nullable: true
    })
    customerPO: string;

    @Column("varchar", {
        name: "ship_to_customer_no",
        length: 15,
        nullable: true
    })
    shipToCustomerNumber: string;

    @Column("varchar", {
        name: "ship_to_customer_name",
        length: 30,
        nullable: true
    })
    shipToCustomerName: string;

    @Column("varchar", {
        name: "planning_season_code",
        length: 5,
        nullable: true
    })
    planningSeasonCode: string;

    @Column("varchar", {
        name: "planning_season_year",
        length: 5,
        nullable: true
    })
    planningSeasonYear: string;

    @Column("varchar", {
        name: "doc_type_code",
        length: 5,
        nullable: true
    })
    docTypeCode: string;

    @Column("varchar", {
        name: "doc_type_desc",
        length: 30,
        nullable: true
    })
    docTypeDesc: string;

    @Column("varchar", {
        name: "mrgac",
        length: 10,
        nullable: true
    })
    MRGAC: string;

    @Column("varchar", {
        name: "ogac",
        length: 10,
        nullable: true
    })
    OGAC: string;

    @Column("varchar", {
        name: "gac",
        length: 10,
        nullable: true
    })
    GAC: string;

    @Column("varchar", {
        name: "origin_receipt_date",
        length: 10,
        nullable: true
    })
    originReceiptDate: string;

    @Column("varchar", {
        name: "factory_delivery_date",
        length: 10,
        nullable: true
    })
    factoryDeliveryActDate: string;

    @Column("varchar", {
        name: "gac_reason_code",
        length: 5,
        nullable: true
    })
    GACReasonCode: string;

    @Column("varchar", {
        name: "gac_reason_desc",
        length: 50,
        nullable: true
    })
    GACReasonDesc: string;

    @Column("varchar", {
        name: "shipping_type",
        length: 30,
        nullable: true
    })
    shippingType: string;

    @Column("varchar", {
        name: "planning_priority_code",
        length: 5,
        nullable: true
    })
    planningPriorityCode: string;

    @Column("varchar", {
        name: "planning_priority_desc",
        length: 15,
        nullable: true
    })
    planningPriorityDesc: string;

    @Column("varchar", {
        name: "launch_code",
        length: 10,
        nullable: true
    })
    launchCode: string;

    @Column("varchar", {
        name: "dpom_item_line_status",
        length: 15,
        nullable: true
    })
    DPOMLineItemStatus: string;

    @Column("varchar", {
        name: "mode_of_transport_code",
        length: 5,
        nullable: true
    })
    modeOfTransportationCode: string;

    @Column("varchar", {
        name: "inco_terms",
        length: 5,
        nullable: true
    })
    inCoTerms: string;

    @Column("varchar", {
        name: "inventory_segment_code",
        length: 10,
        nullable: true
    })
    inventorySegmentCode: string;

    @Column("varchar", {
        name: "purchase_group_code",
        length: 5,
        nullable: true
    })
    purchaseGroupCode: string;

    @Column("varchar", {
        name: "purchase_group_name",
        length: 30,
        nullable: true
    })
    purchaseGroupName: string;

    @Column("varchar", {
        name: "total_item_qty",
        length: 10,
        nullable: true
    })
    totalItemQty: string;

    @Column("varchar", {
        name: "origin_receipt_qty",
        length: 10,
        nullable: true
    })
    originReceiptQty: string;

    @Column("varchar", {
        name: "vas_size",
        length: 100,
        nullable: true
    })
    VASSize: string;

    @Column("varchar", {
        name: "item_vas_text",
        length: 100,
        nullable: true
    })
    itemVasText: string;

    @Column("varchar", {
        name: "item_text",
        length: 100,
        nullable: true
    })
    itemText: string;

    @Column("varchar", {
        name: "gross_price_fob",
        length: 10,
        nullable: true
    })
    grossPriceFOB: string;

    @Column("varchar", {
        name: "fob_currency_code",
        length: 5,
        nullable: true
    })
    FOBCurrencyCode: string;

    @Column("varchar", {
        name: "ne_inc_disc",
        length: 10,
        nullable: true
    })
    netIncludingDisc: string;

    @Column("varchar", {
        name: "net_inc_disc_currency_code",
        length: 5,
        nullable: true
    })
    netIncludingDiscCurrencyCode: string;

    @Column("varchar", {
        name: "trading_net_inc_disc",
        length: 10,
        nullable: true
    })
    trCoNetIncludingDisc: string;

    @Column("varchar", {
        name: "trading_net_currency_code",
        length: 5,
        nullable: true
    })
    trCoNetIncludingDiscCurrencyCode: string;

    @Column("int", {
        name: "size_qty",
        nullable: true
    })
    sizeQuantity: number;

    @Column("varchar", {
        name: "size_description",
        length: 10,
        nullable: true
    })
    sizeDescription: string;

    //PDF Data
    @Column('varchar', {
        name: "ship_to_address_legal_po",
        length: 10,
        nullable: true
    })
    shipToAddressLegalPO: string;

    @Column('int', {
        name: "quantity",
        nullable: true
    })
    quantity: number;

    @Column('decimal', {
        name: "price",
        nullable: true,
        precision:5,
        scale:2
    })
    price: number;

    @Column('varchar', {
        name: "item_vas_pdf",
        length: 10,
        nullable: true
    })
    itemVasPDF: string;

    @Column('varchar', {
        name: "ship_to_address_dia",
        length: 10,
        nullable: true
    })
    shipToAddressDIA: string;

    @Column('varchar', {
        name: "cab_code",
        length: 10,
        nullable: true
    })
    CABCode: string;

    // CRM Data
    @Column('varchar', {
        name: "item",
        length: 10,
        nullable: true
    })
    item: string;

    @Column('varchar', {
        name: "factory",
        length: 20,
        nullable: true
    })
    factory: string;

    @Column('varchar', {
        name: "customer_order",
        length: 20,
        nullable: true
    })
    customerOrder: string;

    @Column('varchar', {
        name: "po_final_approval_date",
        length: 20,
        nullable: true
    })
    coFinalApprovalDate: string;

    @Column('varchar', {
        name: "plan_no",
        length: 20,
        nullable: true
    })
    planNo: string;

    @Column('varchar', {
        name: "truck_out_date",
        length: 20,
        nullable: true
    })
    truckOutDate: string;

    @Column('varchar', {
        name: "actual_shipped_qty",
        length: 20,
        nullable: true
    })
    actualShippedQty: string;

    @Column('decimal', {
        name: "co_price",
        nullable: true,
        precision:5,
        scale:2,
        
    })
    coPrice: number;

    @Column('varchar', {
        name: "ship_to_address",
        length: 20,
        nullable: true
    })
    shipToAddress: string;

    @Column('varchar', {
        name: "payment_term",
        length: 20,
        nullable: true
    })
    paymentTerm: string;

    @Column('varchar', {
        name: "style_desc",
        length: 20,
        nullable: true
    })
    styleDesc: string;

    @Column('varchar', {
        name: "fabric_content",
        length: 20,
        nullable: true
    })
    fabricContent: string;

    @Column('varchar', {
        name: "fabric_source",
        length: 20,
        nullable: true
    })
    fabricSource: string;

    @Column('varchar', {
        name: "commission",
        length: 20,
        nullable: true
    })
    commission: string;

    @Column('varchar', {
        name: "pcd",
        length: 20,
        nullable: true
    })
    PCD: string;

    //Auto Populate
    @Column("varchar", {
        name: "hanger",
        length: 50,
        nullable: true
    })
    hanger: string;

    @Column("varchar", {
        name: "po_and_line",
        length: 20,
        nullable: true
    })
    poAndLine: string;

    @Column("date", {
        name: "last_modified_date",
        nullable: true
    })
    lastModifiedDate: string;

    @Column("varchar", {
        name: "lead_time",
        length: 10,
        nullable: true
    })
    leadTime: string;

    @Column("date", {
        name: "record_date",
        nullable: true
    })
    recordDate: string

    @Column("int", {
        name: "od_version"
    })
    odVersion: number;

    @CreateDateColumn({
        name: "created_at",
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

    @Column('int', {
        nullable: true,
        name: 'file_id',
    })
    fileId: number;

    @Column('varchar', {
        nullable: true,
        name: 'diverted_to_pos',
    })
    divertedToPos: string;

    @OneToMany(() => DpomChildEntity, (dpomChild) => { dpomChild.dpom }, { cascade: true })
    dpomChild: DpomChildEntity;

}
