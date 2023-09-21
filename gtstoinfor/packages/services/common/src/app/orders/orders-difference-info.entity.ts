import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdersEntity } from "./entities/orders.entity";

@Entity('order_diff') //change the name
export class OrdersDifferenceEntity {

    @PrimaryGeneratedColumn("increment", {
        name: "order_diff_id",
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: "prod_plan_id",
    })
    productionPlanId:  number;

    @Column('varchar', {
        nullable: false,
        name: "column_name",
        length: 30
    })
    columnName: string;

    @Column('varchar', {
        nullable: false,
        name: "display_name",
        length: 150
    })
    displayName: string;

    @Column('varchar', {
        nullable: true,
        name: "old_val",
        length: 150
    })
    oldValue: string;

    @Column('varchar', {
        nullable: true,
        name: "new_val",
        length: 150
    })
    newValue: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('int', {
        nullable: false,
        name: 'file_id',
    })
    fileId: number;

    @Column('int', {
        name: 'version',
    })
    version: number;
}