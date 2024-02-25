import { ItemtypeEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { StyleComboEntity } from "./style-combo-entity";
import { PoBomEntity } from "./po-bom.entity";
import { ItemEntity } from "./item-entity";

@Entity('bom')
export class BomEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('enum',{
        name:'item_name',
        enum:ItemtypeEnum,
        nullable:false    
    })
    itemName:ItemtypeEnum

    @Column('int',{
        name:'item_id',
        nullable:false
    })
    itemId:number

    @Column('varchar',{
        name:'description',
        nullable:false
    })
    description:string

    @Column('varchar',{
        name:'im_code',
        nullable:false
    })
    imCode:string

    @Column('varchar',{
        name:'item_type',
        nullable:false
    })
    itemType:string

    @Column('varchar',{
        name:'use',
        nullable:false
    })
    use:string

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

    @ManyToOne(type=> StyleEntity, style =>style.bomEntity)
    @JoinColumn({ name: 'style_id' })
    styleEnityy:StyleEntity
    
    @OneToMany(type => StyleComboEntity,styleCombo =>styleCombo.bomEntity,{cascade:true})
    styleComboEntity:StyleComboEntity[]

    @OneToMany(type => PoBomEntity,poBom =>poBom.bom)
    poBom:PoBomEntity[]

    @ManyToOne(type=> ItemEntity, item =>item.bomEntity)
    @JoinColumn({ name: 'item_id' })
    itemEntity:ItemEntity
}