import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BomEntity } from "./bom-entity";
import { StyleComboEntity } from "./style-combo-entity";
import { ItemTypeEnum } from "@project-management-system/shared-models";

@Entity('items')
export class ItemEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'item_id'
    })
    itemId: number;

    @Column('varchar',{
        name:'item',
        length:50,
    })
    item:string

    // @Column('varchar',{
    //     name:'item_type',
    //     nullable:false
    // })
    // itemType:string

    @Column({
        type: 'enum',
        nullable: false,
        enum: ItemTypeEnum,
        name: "item_type"
    })
    itemType: ItemTypeEnum;
    

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @Column('varchar', {
        nullable: true,
        length: 50,
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

    
}