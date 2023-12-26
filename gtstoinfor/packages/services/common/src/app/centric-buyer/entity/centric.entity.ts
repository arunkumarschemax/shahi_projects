import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders')
export class CentricEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
        length: 15,
    })
    poNumber: string

    @Column('varchar', {
        name: "shipment"
    })
    shipment: string

    @Column('text', {
        name: "season"
    })
    season: string

    @Column('text', {
        name: "port_of_export"
    })
    portOfExport: string

    @Column("varchar", {
        name: "port_of_entry",
        length: 500,
    })
    portOfEntry: string

    @Column("varchar", {
        name: "refrence",
        length: 50,
    })
    Refrence: string

    @Column("varchar", {
        name: "payment_term_description",
        length: 50,
    })
    paymentTermDescription: string

    @Column('varchar', {
        name: "special_instructions"
    })
    specialInstructions: string

    @Column('varchar', {
        name: "po_line",
        length: 50,

    })
    poLine: string

    @Column('varchar', {
        name: "material",
        length: 10,

    })
    material: string

    @Column('varchar', {
        name: "color",
        length: 100
    })
    color: string

    @Column('varchar', {
        name: "gender",
        length: 25
    })
    gender: string

    @Column('varchar', {
        name: "size",
        length: 25
    })
    size: string

    @Column('varchar', {
        name: "upc",
        length: 15
    })
    upc: string

    @Column('varchar', {
        name: "label",
        length: 10
    })
    label: string

    
    @Column('varchar', {
        name: "quantity",
        length: 15
    })
    quantity: string

    @Column('varchar', {
        name: "unit_price",
        length: 50
    })
    unitPrice: string

    @Column('varchar', {
        name: "exfactory",
        length: 50
    })
    exFactory: string

    @Column('varchar', {
        name: "export",
        length: 5
    })
    exPort: string

    @Column('varchar', {
        name: "delivery_date"
    })
    deliveryDate: string

    @Column('varchar', {
        name: "retial_price",
        length: 15
    })
    retialPrice: string


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