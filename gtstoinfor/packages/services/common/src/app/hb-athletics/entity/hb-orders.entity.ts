import { StatusEnum } from "packages/libs/shared-models/src/Enum/status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('orders')
export class HbOrdersEntity {
    @PrimaryGeneratedColumn('increment', {
        name: "id",
    })
    id: number;

    @Column("varchar", {
        name: "cust_po",
    })
    custPo: string

    @Column("varchar", {
        name: "exit_factory_date",
    })
    exitFactoryDate: string

    @Column("varchar", {
        name: "ship_to_add",
    })
    shipToAdd: string

    @Column("varchar", {
        name: "currency",
    })
    currency: string

    @Column("varchar", {
        name: "style",
    })
    style: string

    @Column("varchar", {
        name: "color",
    })
    color: string

    @Column("varchar", {
        name: "size",
    })
    size: string

    @Column("varchar", {
        name: "quantity",
    })
    quantity: string

    @Column("varchar", {
        name: "unit_price",
    })
    unitPrice: string


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
    @Column({
        type: 'enum',
        enum: StatusEnum, // Specify the enum type
        name: 'status',
      })
      status: StatusEnum;

}