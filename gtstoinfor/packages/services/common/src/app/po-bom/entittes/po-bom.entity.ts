import { ItemtypeEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleEntity } from "./style-entity";
import { StyleComboEntity } from "./style-combo-entity";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "./bom-entity";

@Entity('po_bom')
export class PoBomEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('int', {
        name: 'po_qty'
    })
    poQty: number;

    @Column('int', {
        name: 'bom_qty'
    })
    bomQty: number;

    @Column('int', {
        name: 'consumption'
    })
    consumption: number;

    @Column('int', {
        name: 'wastage'
    })
    wastage: number;

    @Column('int', {
        name: 'moq'
    })
    moq: number;

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

    // @ManyToOne(type => StyleEntity, style => style.bomEntity)
    // @JoinColumn({ name: 'style_id' })
    // styleEntityy: StyleEntity

    @ManyToOne(type => DpomEntity, dpom => dpom.poBom)
    @JoinColumn({ name: 'dpom_id' })
    dpom: DpomEntity

    @ManyToOne(type => BomEntity, dpom => dpom.poBom)
    @JoinColumn({ name: 'bom_id' })
    bom: BomEntity

}