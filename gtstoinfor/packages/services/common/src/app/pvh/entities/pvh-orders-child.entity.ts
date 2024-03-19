import { StatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders_child')
export class PvhOrderschildEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "po_number",
    })
    poNumber: string

    @Column("varchar", {
        name: "currency",
    })
    currency: string

    @Column("varchar", {
        name: "buyerName",
    })
    buyerName: string


    
    @Column("varchar", {
        name: "po_line",
    })
    poLine: string

    @Column("varchar", {
        name: "deliveryDate",
    })
    deliveryDate: string



    @Column("varchar", {
        name: "size",
    })
    size: string

    @Column("varchar", {
        name: "color",
    })
    color: string

    @Column("varchar", {
        name: "upc",
    })
    upc: string

    @Column("varchar", {
        name: "quantity",
    })
    quantity: string

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
        default: 1,
        name: "po_version",
    })
    poVersion: string;

    @Column("int", {
        name: "order_id",
    })
    orderId: number;


}

