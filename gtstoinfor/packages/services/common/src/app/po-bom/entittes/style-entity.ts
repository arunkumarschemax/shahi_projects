import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BomEntity } from "./bom-entity";
import { StyleComboEntity } from "./style-combo-entity";

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
        name:'season',
        nullable:false
    })
    season:string

    @Column('varchar',{
        name:'exp_no',
        nullable:false
    })
    expNo:string
    
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at'
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

    @OneToMany(type =>StyleComboEntity, style =>style.styleEntity, {cascade: true})
    styleComboEntity:StyleComboEntity[]
}