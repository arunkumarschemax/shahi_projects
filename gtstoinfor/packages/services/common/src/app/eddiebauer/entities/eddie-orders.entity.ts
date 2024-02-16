import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders')
export class EddieOrdersEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
    })
    poNumber: string

    // @Column("varchar", {
    //     name: "po_date",
    // })
    // poDate: string

    
    @Column("varchar", {
        name: "delivery_date",
    })
    deliveryDate: string

    @Column('varchar', {
        name: "ex_factory_date"
    })
    exFactoryDate: string

    // @Column('text', {
    //     name: "incoterm"
    // })
    // incoterm: string

    // @Column('text', {
    //     name: "ship_to_add"
    // })
    // shipToAdd: string


    // @Column('text', {
    //     name: "manufacture"
    // })
    // manufacture: string

    @Column('text', {
        name: "buyer_address"
    })
    buyerAddress: string

    @Column('text', {
        name: "delivery_address"
    })
    deliveryAddress: string

    @Column('varchar', {
        name: "currency",

    })
    currency: string


    // @Column("varchar", {
    //     name: "payment_terms",
    // })
    // paymentTerms: string

    // @Column('varchar', {
    //     name: "shipment_mode"
    // })
    // shipmentMode: string



    @Column('varchar', {
        name: "po_line",
    })
    poLine: string;

    @Column('varchar', {
        name: "buyer_item",

    })
    buyerItem: string


    // @Column('varchar', {
    //     name: "short_description",

    // })
    // shortDescription: string
    @Column('varchar', {
        name: "color",

    })
    color: string

    @Column('varchar', {
        name: "buyer_style",

    })
    buyerStyle: string


    // @Column('varchar', {
    //     name: "currency",

    // })
    // currency: string



    @Column('varchar', {
        name: "size_code",

    })
    sizeCode: string

    @Column('varchar', {
        name: "size",

    })
    size: string

    @Column('varchar', {
        name: "upc",

    })
    upc: string

    @Column('varchar', {
        name: "sku",

    })
    sku: string

    @Column('varchar', {
        name: "quantity_per_inner_pack",

    })
    quantityPerInnerPack: string

    @Column('varchar', {
        name: "retail_price",

    })
    retailPrice: string


    @Column('varchar', {
        name: "quantity",

    })
    quantity: string

    
    @Column('varchar', {
        name: "unit",

    })
    unit: string

    @Column('varchar', {
        name: "unit_cost",

    })
    unitCost: string

    @Column('varchar', {
        name: "cost",

    })
    cost: string

    @Column({
        type: 'enum',
        enum: StatusEnum,
        name: 'status',
    })
    status: StatusEnum;


    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
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