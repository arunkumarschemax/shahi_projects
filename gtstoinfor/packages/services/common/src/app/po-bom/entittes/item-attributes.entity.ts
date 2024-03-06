import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BomEntity } from "./bom-entity";
import { StyleComboEntity } from "./style-combo-entity";
import { ItemTypeEnum } from "@project-management-system/shared-models";
import { ZFactorsEntity } from "./z-factors.entity";

@Entity('item_attributes')
export class ItemAttributesEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        name: "style"
    })
    style : string

    
    @Column({
        type: 'varchar',
        nullable: false,
        name: "attribute"
    })
    attribute : string

    @Column({
        type: 'varchar',
        nullable: false,
        name: "attribute_value"
    })
    attributeValue : string


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

    // @OneToMany(type => ZFactorsEntity,zFactor =>zFactor.itemEntity)
    // zFactorEntity:ZFactorsEntity

    @OneToMany(type =>BomEntity, style =>style.itemEntity, {cascade: true})
    bomEntity:BomEntity[]
    
}