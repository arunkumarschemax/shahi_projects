import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('co_line') //change the name
export class COLineEntity {

    @PrimaryGeneratedColumn("increment", {
        name: "id",
    })
    id: number;

    @Column('varchar', {
        nullable: false,
        name: "buyer_po",
        length: 15
    })
    buyerPo: string;

    @Column('int', {
        nullable: true,
        name: "division",
    })
    division: number;

    @Column('varchar', {
        nullable: true,
        name: "PCH",
        length: 5
    })
    PCH: string;

    @Column('int', {
        nullable: true,
        name: "facility",
    })
    facility: number;

    @Column('varchar', {
        nullable: true,
        name: "order_no",
        length: 15
    })
    orderNo: string;

    @Column('varchar', {
        nullable: true,
        name: "customer_code",
        length: 15
    })
    customerCode: string;

    @Column('varchar', {
        nullable: true,
        name: "item_no",
        length: 4
    })
    itemNo: string;

    @Column('varchar', {
        nullable: true,
        name: "item_desc",
        length: 50
    })
    itemDesc: string;

    @Column('int', {
        nullable: true,
        name: "order_qty",
    })
    orderQty: number;

    @Column('varchar', {
        nullable: true,
        name: "UOM",
        length: 5
    })
    UOM: string;

    @Column('varchar', {
        nullable: true,
        name: "size",
        length: 5
    })
    size: string;

    @Column('varchar', {
        nullable: true,
        name: "price",
        length: 10
    })
    price: string;

    @Column('varchar', {
        nullable: true,
        name: "currency",
        length: 5
    })
    currency: string;

    @Column('varchar', {
        nullable: true,
        name: "co_final_app_date",
        length: 50
    })
    coFinalAppDate: string;

    @Column('varchar', {
        nullable: true,
        name: "PCD",
        length: 50
    })
    PCD: string;

    @Column('varchar', {
        nullable: true,
        name: "commision",
        length: 50
    })
    commision: string;

    @Column('varchar', {
        nullable: true,
        name: "plan_no",
        length: 50
    })
    planNo: string;

    @Column('varchar', {
        nullable: true,
        name: "plan_unit",
        length: 50
    })
    planUnit: string;

    @Column('varchar', {
        nullable: true,
        name: "pay_terms",
        length: 50
    })
    payTerms: string;

    @Column('varchar', {
        nullable: true,
        name: "pay_terms_desc",
        length: 225
    })
    payTermsDesc: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "created_user",
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: string;

    @Column("varchar", {
        nullable: true,
        length: 40,
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