import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdersEntity } from "./orders.entity";

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
    productionPlanId: string;

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
        nullable: false,
        name: "old_val",
        length: 150
    })
    oldValue: string;

    @Column('varchar', {
        nullable: false,
        name: "new_val",
        length: 150
    })
    newValue: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;
}