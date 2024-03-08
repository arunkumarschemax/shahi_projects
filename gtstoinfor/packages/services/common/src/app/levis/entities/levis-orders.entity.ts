import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders')
export class LevisOrdersEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
    })
    poNumber: string


    @Column('text', {
        name: "delivery_address"
    })
    deliveryAddress: string

    @Column("varchar", {
        name: "currency",
    })
    currency: string

    @Column("varchar", {
        name: "po_line",
    })
    poLine: string

    @Column("varchar", {
        name: "material",
    })
    material: string


    // @Column("varchar", {
    //     name: "total_unit_price",
    // })
    // totalUnitPrice: string


    // @Column("varchar", {
    //     name: "original_date",
    // })
    // originalDate: string

    
    @Column("varchar", {
        name: "transmode",
    })
    transMode: string

    @Column("varchar", {
        name: "plannedExFactoryDate",
    })
    plannedExFactoryDate: string

    
    @Column("varchar", {
        name: "ex_factory_date",
    })
    exFactoryDate: string





    
    @Column("varchar", {
        name: "item_no",
    })
    itemNo: string
    
    // @Column("varchar", {
    //     name: "product",
    // })
    // product: string

    @Column("varchar", {
        name: "size",
    })
    size: string

    @Column("varchar", {
        name: "upc",
    })
    upc: string

    @Column("varchar", {
        name: "quantity",
    })
    quantity: string

    
    @Column("varchar", {
        name: "unit_price",
    })
    unitPrice: string
        
    @Column("varchar", {
        name: "schedule_date",
    })
    scheduledDate: string




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

    
    @Column("varchar", {
        name: "po_remarks",
    })
    poRemarks: string


    @Column("varchar", {
        name: "split_po",
    })
    splitPo: string

    @Column("varchar", {
        name: "total_quantity",
    })
    totalQuantity:string



}