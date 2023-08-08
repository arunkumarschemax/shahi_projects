import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('dpom')
export class DpomEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column({
        name: "document_date",
        length: 100,
    })
    documentDate: string;

    @Column({
        name: "po_number",
        length: 100,
    })
    purchaseOrderNumber: string;

    @Column({
        name: "po_line_item_number",
        length: 100,
    })
    poLineItemNumber: string;

    @Column({
        name: "category_code",
        length: 100,
    })
    categoryCode: string;

    @Column({
        name: "category_desc",
        length: 100,
    })
    categoryDesc: string;

    @Column({
        name: "vendor_code",
        length: 100,
    })
    vendorCode: string;

    @Column({
        name: "gcc_focus_code",
        length: 100,
    })
    gccFocusCode: string;

    @Column({
        name: "gcc_focus_desc",
        length: 100,
    })
    gccFocusDesc: string;

    @Column({
        name: "gender_age_code",
        length: 100,
    })
    genderAgeCode: string;

    @Column({
        name: "style_number",
        length: 100,
    })
    styleNumber: string;

    @Column({
        name: "product_code",
        length: 100,
    })
    productCode: string;

    @Column({
        name: "color_desc",
        length: 100,
    })
    colorDesc: string;

    @Column({
        name: "destination_country_code",
        length: 100,
    })
    destinationCountryCode: string;

    @Column({
        name: "destination_country",
        length: 100,
    })
    destinationCountry: string;

    @Column({
        name: "plant",
        length: 100,
    })
    plant: string;

    @Column({
        name: "plant_name",
        length: 100,
    })
    plantName: string;

    @Column({
        name: "trading_co_po_no",
        length: 100,
    })
    tradingCoPoNumber: string;

    @Column({
        name: "upc",
        length: 100,
    })
    UPC: string;

    @Column({
        name: "direct_ship_so_no",
        length: 100,
    })
    directShipSONumber: string;

    @Column({
        name: "direct_ship_so_item_no",
        length: 100,
    })
    directShipSOItemNumber: string;

    @Column({
        name: "customer_po",
        length: 100,
    })
    customerPO: string;

    @Column({
        name: "ship_to_customer_no",
        length: 100,
    })
    shipToCustomerNumber: string;

    @Column({
        name: "ship_to_customer_name",
        length: 100,
    })
    shipToCustomerName: string;

    @Column({
        name: "planning_season_code",
        length: 100,
    })
    planningSeasonCode: string;

    @Column({
        name: "planning_season_year",
        length: 100,
    })
    planningSeasonYear: string;

    @Column({
        name: "doc_type_code",
        length: 100,
    })
    docTypeCode: string;

    @Column({
        name: "doc_type_desc",
        length: 100,
    })
    docTypeDesc: string;

    @Column({
        name: "mrgac",
        length: 100,
    })
    MRGAC: string;

    @Column({
        name: "ogac",
        length: 100,
    })
    OGAC: string;

    @Column({
        name: "gac",
        length: 100,
    })
    GAC: string;

    @Column({
        name: "origin_receipt_date",
        length: 100,
    })
    originReceiptDate: string;

    @Column({
        name: "factory_delivery_date",
        length: 100,
    })
    factoryDeliveryActDate: string;

    @Column({
        name: "gac_reason_code",
        length: 100,
    })
    GACReasonCode: string;

    @Column({
        name: "shipping_type",
        length: 100,
    })
    shippingType: string;

    @Column({
        name: "planning_priority_code",
        length: 100,
    })
    planningPriorityCode: string;

    @Column({
        name: "planning_priority_desc",
        length: 100,
    })
    planningPriorityDesc: string;

    @Column({
        name: "launch_code",
        length: 100,
    })
    launchCode: string;

    @Column({
        name: "dpom_item_line_status",
        length: 100,
    })
    DPOMLineItemStatus: string;

    @Column({
        name: "mode_of_transport_code",
        length: 100,
    })
    modeOfTransportationCode: string;

    @Column({
        name: "inco_terms",
        length: 100,
    })
    inCoTerms: string;

    @Column({
        name: "inventory_segment_code",
        length: 100,
    })
    inventorySegmentCode: string;

    @Column({
        name: "purchase_group_code",
        length: 100,
    })
    purchaseGroupCode: string;

    @Column({
        name: "purchase_group_name",
        length: 100,
    })
    purchaseGroupName: string;

    @Column({
        name: "total_item_qty",
        length: 100,
    })
    totalItemQty: string;

    @Column({
        name: "origin_receipt_qty",
        length: 100,
    })
    originReceiptQty: string;

    @Column({
        name: "vas_size",
        length: 100,
    })
    VASSize: string;

    @Column({
        name: "item_vas_text",
        length: 100,
    })
    itemVasText: string;

    @Column({
        name: "item_text",
        length: 100,
    })
    itemText: string;

    @Column({
        name: "gross_price_fob",
        length: 100,
    })
    grossPriceFOB: string;

    @Column({
        name: "fob_currency_code",
        length: 100,
    })
    FOBCurrencyCode: string;

    @Column({
        name: "ne_inc_disc",
        length: 100,
    })
    netIncludingDisc: string;

    @Column({
        name: "net_inc_disc_currency_code",
        length: 100,
    })
    netIncludingDiscCurrencyCode: string;

    @Column({
        name: "trading_net_inc_disc",
        length: 100,
    })
    trCoNetIncludingDisc: string;

    @Column({
        name: "trading_net_currency_code",
        length: 100,
    })
    trCoNetIncludingDiscCurrencyCode: string;

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
}
