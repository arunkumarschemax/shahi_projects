import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { ItemEntity } from "./item-entity";
import { ZFactorsEntity } from "./z-factors.entity";
import { PoBomEntity } from "./po-bom.entity";

@Entity('z_factors_bom')
export class ZFactorsBomEntity {
 
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('varchar', {
        nullable: true,
        name: 'item_name',
        length: 50,
    })
    itemName: string

    @Column('varchar', {
        nullable: true,
        name: 'im_code',
        length: 50,
    })
    imCode: string

    @Column('varchar', {
        nullable: true,
        name: 'geo_code',
    })
    geoCode: string

    @Column('varchar', {
        nullable: true,
        name: 'destination',
    })
    destination: string

    @Column('varchar', {
        nullable: true,
        name: 'size',
    })
    size: string

    @Column('int', {
        nullable: true,
        name: 'sequence',
    })
    sequence: number

    @Column('varchar', {
        nullable: true,
        name: 'style',
    })
    style: string

    @Column('varchar', {
        nullable: true,
        name: 'gender',
    })
    gender: string

    @Column('varchar', {
        nullable: true,
        name: 'plant_code',
    })
    plant: string

    @CreateDateColumn({
        name: 'created_at',
        nullable: true
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable: true
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @VersionColumn({
        default: 1,
        name: 'version_flag'
    })
    versionFlag: number;

    @Column('boolean', {
        nullable: false,
        name: 'is_active',
        default: true
    })
    isActive: boolean;


    @OneToMany(type => PoBomEntity, poBom => poBom.bom)
    poBom: PoBomEntity

    @ManyToOne(type => ZFactorsEntity, zfactor => zfactor.zFactorBom)
    @JoinColumn({ name: 'zfactor_id' })
    zFactors: ZFactorsEntity
}