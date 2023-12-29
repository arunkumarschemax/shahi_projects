import { StatusEnum } from "@project-management-system/shared-models";
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

    @Column("varchar", {
        name: "po_date",
    })
    poDate: string

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

    @Column('varchar', {
        name: "division"
    })
    division: string

    @Column('varchar', {
        name: "incoterm"
    })
    incoterm: string

    @Column('varchar', {
        name: "ship_to_add"
    })
    shipToAdd: string

    
    @Column('varchar', {
        name: "manufacture"
    })
    manufacture: string



    

    @Column('int', {
        name: "po_line",

    })
    poLine: number

    @Column('varchar', {
        name: "material",

    })
    material: string

    @Column('varchar', {
        name: "ppk_upc",
        
    })
    ppkupc: string

    @Column('varchar', {
        name: "color",
    })
    color: string

    @Column('varchar', {
        name: "gender",
        
    })
    gender: string

    @Column('varchar', {
        name: "short_description",
        
    })
    shortDescription: string

    @Column('varchar', {
        name: "pack_method",
        
    })
    packMethod: string

    @Column('varchar', {
        name: "vendor_booking_flag",
        
    })
    vendorBookingFlag: string




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

    @Column('varchar', {
        name: "compt_material"
    })
    comptMaterial: string

    
    @Column('varchar', {
        name: "ratio"
    })
    ratio: string

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

      
    // @Column('enum', {
    //     name: "status"
    // })
    // status: StatusEnum
    @Column({
        type: 'enum',
        enum: StatusEnum, // Specify the enum type
        name: 'status',
      })
      status: StatusEnum;

}