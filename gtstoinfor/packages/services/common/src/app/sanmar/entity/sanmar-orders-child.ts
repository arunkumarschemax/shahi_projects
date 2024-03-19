import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders_child')
export class SanmarOrderschildEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "buyer_po",
    })
    buyerPo: string

    @Column("varchar", {
        name: "po_date",
    })
    poDate: string

    @Column("text", {
        name: "buyer_address",
    })
    buyerAddress: string

    @Column("text", {
        name: "ship_to_address",
    })
    shipToAdd: string


    @Column("varchar", {
        name: "po_style",
    })
    poStyle: string

    
    @Column("varchar", {
        name: "delivery_date",
    })
    deliveryDate: string

    @Column("varchar", {
        name: "currency",
    })
    currency: string

        
    @Column("varchar", {
        name: "quantity",
    })
    quantity: string

           
    @Column("varchar", {
        name: "unit",
    })
    unit: string

    @Column("varchar", {
        name: "unit_price",
    })
    unitPrice: string

    
    @Column("varchar", {
        name: "line",
    })
    line: string

    @Column("varchar", {
        name: "size",
    })
    size: string

    @Column("varchar", {
        name: "color",
    })
    color: string

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

    @Column("int", {
        default: 1,
        name: "po_version",
    })
    poVersion: number;

    @Column("int", {
        name: "order_id",
    })
    orderId: number;
    

}