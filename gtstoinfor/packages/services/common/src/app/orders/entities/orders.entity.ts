import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrdersChildEntity } from "./orders-child.entity";

@Entity('orders') //change the name
export class OrdersEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'production_plan_id',
    })
    productionPlanId: number

    @Column('varchar', {
        nullable: true,
        name: "year",
        length:50
        
    })
    year: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_ssn",
        length:50
    })
    planningSsn: string;

    @Column('varchar', {
        nullable: true,
        name: "biz",
        length:50
    })
    biz: string;

    @Column('varchar', {
        nullable: true,
        name: "core_category",
        length:50
    })
    coreCategory: string;

    @Column('varchar', {
        nullable: true,
        name: "planning_sum",
        length:50
    })
    planningSum: string;

    @Column('varchar', {
        nullable: true,
        name: "coeff",
        length:50
    })
    coeff: string;

    @Column('varchar', {
        nullable: true,
        name: "publish_flag_for_factory",
        length:50
    })
    publishFlagForFactory: string;

    @Column('varchar', {
        nullable: true,
        name: "order_plan_number",
        length:50
    })
    orderPlanNumber: string;

    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty",
        length:50
    })
    orderPlanQty: string;


    @Column('varchar', {
        nullable: true,
        name: "order_plan_qty_coeff",
        length:50
    })
    orderPlanQtyCoeff: string;

    @Column('varchar', {
        nullable: true,
        name: "prod_plan_type",
        length:50
    })
    prodPlanType: string;

    @Column('varchar', {
        nullable: true,
        name: "wh",
        length:50
    })
    wh: string;

    @Column('varchar', {
        nullable: true,
        name: "exf_etd",
        length:50

    })
    exfEtd: string;

    @Column('varchar', {
        nullable: true,
        name: "etd_wh",
        length:50

    })
    etdWh: string;

    @Column('varchar', {
        nullable:true,
        name: 'sample',
        length:50

    })
    sample : string;

    
    @Column('varchar', {
        nullable: true,
        name: "exf",
        length:50
    })
    exf: string;

    @Column('varchar', {
        nullable: true,
        name: 'created_user',
        length:50
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'updated_user',
    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: string;

    @Column('int', {
        nullable: true,
        name: 'version',
    })
    version: number;

   
    @Column('int', {
        nullable:true,
        name: 'file_id',
    })
    fileId : number;

    @OneToMany(() => OrdersChildEntity, (ordersChild) => { ordersChild.orders }, { cascade: true })
    ordersChild: OrdersChildEntity;

  
}