import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders_data')
export class RLOrdersEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
        length: 15,
    })
    poNumber: string

    @Column('int', {
        name: "po_item"
    })
    poItem: number

    @Column('text', {
        name: "ship_to_address"
    })
    shipToAddress: string

    @Column('text', {
        name: "bill_to_address"
    })
    billToAddress: string

    @Column("varchar", {
        name: "agent",
        length: 500,
    })
    agent: string

    @Column("varchar", {
        name: "purchase_group",
        length: 50,
    })
    purchaseGroup: string

    @Column("varchar", {
        name: "supplier",
        length: 50,
    })
    supplier: string

    @Column('int', {
        name: "revision_no"
    })
    revisionNo: number

    @Column('varchar', {
        name: "po_upload_date",
        length: 50,

    })
    poUploadDate: string

    @Column('varchar', {
        name: "status",
        length: 10,

    })
    status: string

    @Column('varchar', {
        name: "division",
        length: 100
    })
    division: string

    @Column('varchar', {
        name: "ship_to",
        length: 25
    })
    shipTo: string

    @Column('varchar', {
        name: "bill_to",
        length: 25
    })
    billTo: string

    @Column('varchar', {
        name: "season_code",
        length: 15
    })
    seasonCode: string

    @Column('varchar', {
        name: "board_code",
        length: 10
    })
    boardCode: string

    @Column('varchar', {
        name: "style",
        length: 50
    })
    style: string

    @Column('varchar', {
        name: "material_no",
        length: 50
    })
    materialNo: string

    @Column('varchar', {
        name: "rl_style_no",
        length: 15
    })
    rlStyleNo: string

    @Column('varchar', {
        name: "handover_date",
        length: 15
    })
    handoverDate: string

    @Column('varchar', {
        name: "color",
        length: 50
    })
    color: string

    @Column('varchar', {
        name: "size",
        length: 5
    })
    size: string

    @Column('int', {
        name: "total_qty"
    })
    totalQty: number

    @Column('varchar', {
        name: "ship_date",
        length: 15
    })
    shipDate: string

    @Column('varchar', {
        name: "ship_mode",
        length: 10
    })
    shipMode: string

    @Column('varchar', {
        name: "msrp_price",
        length: 5
    })
    msrpPrice: string

    @Column('varchar', {
        name: "msrp_currency",
        length: 5
    })
    msrpCurrency: string

    @Column('varchar', {
        name: "c_s_price",
        length: 5
    })
    csPrice: string

    @Column('varchar', {
        name: "c_s_currency",
        length: 5
    })
    csCurrency: string

    @Column('varchar', {
        name: "amount",
        length: 10
    })
    amount: string

    @Column('varchar', {
        name: "total_amount",
        length: 10
    })
    totalAmount: string

    @Column('varchar', {
        name: "price",
        length: 5
    })
    price: string

    @Column('varchar', {
        name: "currency",
        length: 5
    })
    currency: string

    @Column('int', {
        name: "quantity"
    })
    quantity: number


    @Column('varchar', {
        name: "upc_ean",
        length: 25
    })
    upcEan: string

    @Column('varchar', {
        name: "buyer",
        length: 255
    })
    buyer: string


    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 25,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 25,
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