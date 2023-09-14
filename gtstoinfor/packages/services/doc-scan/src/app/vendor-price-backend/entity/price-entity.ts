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
        name: "headOfCharges"
    })
    headOfCharges: string;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "perUnit"
    })
    perUnit: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'dpLogistics',
    })
    dpLogistics: string;



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
        name: 'unitprice',
    })
    unitPrice: string;


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