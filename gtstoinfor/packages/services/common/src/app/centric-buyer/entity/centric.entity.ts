import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders')
export class CentricEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
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
    })
    portOfEntry: string

    @Column("varchar", {
        name: "refrence",
    })
    Refrence: string

    @Column("varchar", {
        name: "payment_term_description",
    })
    paymentTermDescription: string

    @Column('varchar', {
        name: "special_instructions"
    })
    specialInstructions: string

    @Column('int', {
        name: "po_line",

    })
    poLine: number

    @Column('varchar', {
        name: "material",

    })
    material: string

    @Column('varchar', {
        name: "color",
    })
    color: string

    @Column('varchar', {
        name: "gender",
        
    })
    gender: string

    @Column('varchar', {
        name: "size",
        
    })
    size: string

    @Column('varchar', {
        name: "upc",
        
    })
    upc: string

    @Column('varchar', {
        name: "label",
        
    })
    label: string

    
    @Column('varchar', {
        name: "quantity",
        
    })
    quantity: string

    @Column('varchar', {
        name: "unit_price",
        
    })
    unitPrice: string

    @Column('varchar', {
        name: "exfactory",
        
    })
    exFactory: string

    @Column('varchar', {
        name: "export",
            })
    exPort: string

    @Column('varchar', {
        name: "delivery_date"
    })
    deliveryDate: string

    @Column('varchar', {
        name: "retial_price",
        
    })
    retialPrice: string


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