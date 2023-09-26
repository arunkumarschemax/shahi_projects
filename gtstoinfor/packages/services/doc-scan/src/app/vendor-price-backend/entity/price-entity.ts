import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
@Entity('PriceList')
export class PriceEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
    })
    priceId: number;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "head_of_charges"
    })
    headOfCharges: string;
    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "hsn_code"
    })
    hsnCode: string;
    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "service_description"
    })
    serviceDescription: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "per_unit"
    })
    perUnit: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'dp_logistics',
    })
    dpLogistics: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'buyers_name',
    })
    buyersName: string;



    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "vendor"
    })
    vendor: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "nsh"
    })
    nsh: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'ksr',
    })
    ksr: string;


    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'unit_price',
    })
    unitPrice: string;

    @Column('varchar', {
        length: 50,
        name: 'service_code',
    })
    serviceCode: string;


    @CreateDateColumn({
        name: "created_at",
        type: "datetime"
    })
    createdAt: Date;

    @Column("varchar", {

        name: "created_user",
        length: 50
    })
    createdUser: string;


    @UpdateDateColumn({
        name: "updated_at",
        type: 'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {

        name: "updated_user",
        length: 50
    })
    updatedUser: string;

    @VersionColumn({

        name: "version_flag",
        default: 1
    })
    versionFlag: number;






}