import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { ItemEntity } from "./item-entity";
import { ZFactorsBomEntity } from "./z-factors-bom.entity";
import { ActionEnum } from "packages/libs/shared-models/src/Enum/z-factors-Enum";

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
    itemId: number

    @Column('varchar', {
        nullable: true,
        name: 'actual_im',
        length: 50,
    })
    actualIM: string

    @Column( {
        type:"enum",
        name:'action',
        enum:ActionEnum,
        nullable:false
    })
    action: ActionEnum

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
        name: 'gender',
    })
    gender: boolean

    
    @Column('boolean', {
        nullable: true,
        name: 'plant_code',
    })
    plant: boolean

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

    @Column('boolean', {
        nullable: false,
        name: 'is_size_split',
        default: true
    })
    isSizeSplit: boolean;
    
    @OneToMany(type => ZFactorsBomEntity,zfactorBom =>zfactorBom.zFactors)
    zFactorBom:ZFactorsBomEntity[]

    
}