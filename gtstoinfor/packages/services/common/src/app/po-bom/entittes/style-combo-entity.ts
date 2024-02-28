import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BomEntity } from "./bom-entity";
import { StyleEntity } from "./style-entity";
import { Exclude } from 'class-transformer';

@Entity('style_combos')
export class StyleComboEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    // @Column('int',{
    //     name:'style_id',
    //     nullable:false
    // })
    // styleId:number

    @Column('varchar',{
        name:'combination',
        nullable:false
    })
    combination:string

    @Column('varchar',{
        name:'primary_color',
        nullable:false
    })
    primaryColor:string

    @Column('varchar',{
        name:'secondary_color',
        nullable:false
    })
    secondaryColor:string

    
    @Column('varchar',{
        name:'logo_color',
        nullable:false
    })
    logoColor:string

    @Column('varchar',{
        name:'item_color',
        nullable:false
    })
    itemColor:string

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

    @ManyToOne(type =>BomEntity,bomentity=>bomentity.styleComboEntity)
    @JoinColumn({name:'bom_id'})
    bomEntity:BomEntity

    @ManyToOne(type =>StyleEntity,style =>style.styleComboEntity)
    @JoinColumn({name:'style_id'})
    @Exclude()
    styleEntity:StyleEntity

}