import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn, CreateDateColumn } from 'typeorm';

@Entity('divert_report')
export class DivertEntity {
    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        name: "o_item",
        length: 10
    })
    oItem: string;

    @Column('varchar', {
        nullable: true,
        name: "o_plant",
        length: 10
    })
    oPlant: string;

    @Column('varchar', {
        nullable: true,
        name: "o_product_code",
        length: 15
    })
    oProductCode: string;

    @Column('varchar', {
        nullable: true,
        name: "o_factory",
        length: 5
    })
    oFactory: string;

    @Column('varchar', {
        nullable: false,
        name: "o_line_item_status",
        length: 15
    })
    oLineItemStatus: string;

    @Column('varchar', {
        nullable: true,
        name: "o_document_date",
        length: 15
    })
    oDocumentDate: string;

    @Column('varchar', {
        nullable: false,
        name: "o_po_number",
        length: 15
    })
    oPurchaseOrderNumber: string;

    @Column('int', {
        nullable: false,
        name: "o_po_line",
    })
    oPoLineItemNumber: number;

    @Column('varchar', {
        nullable: true,
        name: "o_total_item_qty",
        length: 10
    })
    oTotalItemQty: string;

    @Column('varchar', {
        nullable: true,
        name: "o_destination",
        length: 50
    })
    oDestination: string;

    @Column('varchar', {
        nullable: true,
        name: "o_shipment_type",
        length: 50
    })
    oShipmentType: string;

    @Column('varchar', {
        nullable: false,
        name: "o_ogac",
        length: 15
    })
    oOGAC: string;

    @Column('varchar', {
        nullable: false,
        name: "o_gac",
        length: 15
    })
    oGAC: string;

    @Column('varchar', {
        nullable: false,
        name: "o_inv_segment_code",
        length: 50
    })
    oInventorySegmentCode: string;

    @Column('text', {
        nullable: true,
        name: "o_item_vas_text",
    })
    oItemVasText: string;

    @Column('text', {
        nullable: true,
        name: "o_item_text",
    })
    oItemText: string;

    @Column('varchar', {
        nullable: true,
        name: "old_bal_qty",
        length: 10
    })
    oldVal: string;

    @Column('varchar', {
        nullable: true,
        name: "o_fob_price",
        length: 10
    })
    oFOBPrice: string;

    @Column('varchar', {
        nullable: true,
        name: "o_trade_co_net_inc_disc",
        length: 10
    })
    oTradingCoNetIncDis: string;

    @Column('varchar', {
        nullable: true,
        name: "o_request_date",
        length: 15
    })
    orequestDate: string;

    @Column('varchar', {
        nullable: true,
        name: "n_item",
        length: 10
    })
    nItem: string;

    @Column('varchar', {
        nullable: true,
        name: "n_plant",
        length: 10
    })
    nPlant: string;

    @Column('varchar', {
        nullable: true,
        name: "n_product_code",
        length: 15
    })
    nProductCode: string;

    @Column('varchar', {
        nullable: true,
        name: "n_factory",
        length: 5
    })
    nFactory: string;

    @Column('varchar', {
        nullable: false,
        name: "n_line_item_status",
        length: 15
    })
    nLineItemStatus: string;

    @Column('varchar', {
        nullable: false,
        name: "n_document_date",
        length: 15
    })
    nDocumentDate: string;

    @Column('varchar', {
        nullable: false,
        name: "n_po_number",
        length: 15
    })
    nPurchaseOrderNumber: string;

    @Column('int', {
        nullable: false,
        name: "n_po_line",
    })
    nPoLineItemNumber: number;

    @Column('varchar', {
        nullable: true,
        name: "n_total_item_qty",
        length: 10
    })
    nTotalItemQty: string;

    @Column('varchar', {
        nullable: true,
        name: "n_shipment_type",
        length: 50
    })
    nShipmentType: string;

    @Column('varchar', {
        nullable: false,
        name: "n_ogac",
        length: 15
    })
    nOGAC: string;

    @Column('varchar', {
        nullable: false,
        name: "n_gac",
        length: 15
    })
    nGAC: string;

    @Column('varchar', {
        nullable: true,
        name: "n_inv_segment_code",
        length: 50
    })
    nInventorySegmentCode: string;

    @Column('varchar', {
        nullable: false,
        name: "n_destination",
        length: 50
    })
    nDestination: string;

    @Column('text', {
        nullable: true,
        name: "n_item_vas_text",
    })
    nItemVasText: string;

    @Column('text', {
        nullable: true,
        name: "n_item_text",
    })
    nItemText: string;

    @Column('varchar', {
        nullable: true,
        name: "n_fob_price",
        length: 10
    })
    nFOBPrice: string;

    @Column('varchar', {
        nullable: true,
        name: "n_trade_co_net_inc_disc",
        length: 10
    })
    nTradingCoNetIncDis: string;

    @Column('text', {
        nullable: true,
        name: "trims_change"
    })
    trimsChange: string;

    @Column('varchar', {
        nullable: true,
        name: "surcharge",
    })
    surcharge: string;

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
