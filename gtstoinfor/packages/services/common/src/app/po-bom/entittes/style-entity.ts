import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BomEntity } from "./bom-entity";
import { StyleComboEntity } from "./style-combo-entity";
import { Exclude } from 'class-transformer';

@Entity('styles')
export class StyleEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('varchar',{
        name:'style',
        nullable:false
    })
    style:string

    @Column('varchar',{
        name:'style_name',
        nullable:false
    })
    styleName:string

    @Column('varchar',{
        name:'msc_level_one',
        nullable:false
    })
    mscLevelOne:string

    
    @Column('varchar',{
        name:'msc_level_two',
        nullable:false
    })
    mscLevelTwo:string

    @Column('varchar',{
        name:'msc_level_three',
        nullable:false
    })
    mscLevelThree:string

    @Column('varchar',{
        name:'season',
        nullable:false
    })
    season:string
    

    @Column('varchar',{
        name:'year',
        nullable:false
    })
    year:string

    
    @Column('varchar',{
        name:'msc_code',
        nullable:false
    })
    mscCode:string

    

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

    @OneToMany(type => BomEntity, bom => bom.styleEnityy, { cascade: true })
    bomEntity: BomEntity[];

    @OneToMany(type =>StyleComboEntity, style =>style.styleEntity,{ cascade: true })
    styleComboEntity:StyleComboEntity[]
}