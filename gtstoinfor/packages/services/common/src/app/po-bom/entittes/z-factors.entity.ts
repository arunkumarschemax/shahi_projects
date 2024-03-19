import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { ItemEntity } from "./item-entity";
import { ZFactorsBomEntity } from "./z-factors-bom.entity";

@Entity('z_factors')
export class ZFactorsEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('int', {
        nullable: true,
        name: 'item_id',
    })
    itemId: string

    @Column('varchar', {
        nullable: true,
        name: 'actual_im',
        length: 50,
    })
    actualIM: string

    @Column('varchar', {
        nullable: true,
        name: 'action',
        length: 50,
    })
    action: string

    @Column('boolean', {
        nullable: true,
        name: 'geo_code',
    })
    geoCode: boolean

    @Column('boolean', {
        nullable: true,
        name: 'destination',
    })
    destination: boolean

    @Column('boolean', {
        nullable: true,
        name: 'size',
    })
    size: boolean

    @Column('boolean', {
        nullable: true,
        name: 'style',
    })
    style: boolean

    @CreateDateColumn({
        name: 'created_at',
        nullable:true
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
        nullable:true
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


    
    @OneToMany(type => ZFactorsBomEntity,zfactorBom =>zfactorBom.zFactors)
    zFactorBom:ZFactorsBomEntity[]

    
}