import { QtyTypeEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ThreadSupplierEntity } from "../thread-supplier/thread-supplier.entity";

@Entity('thread_qty')
export class ThreadQtyEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'thread_qty_id'
    })
    threadQtyId: number;

    @Column('varchar', {
        name: 'tex',
        nullable: false
    })
    tex: string

    @Column('varchar', {
        name: 'quality',
        nullable: false
    })
    quality: string


    @Column({
        type: 'enum',
        nullable: false,
        enum: QtyTypeEnum,
        name: "qty"
    })
    qty: QtyTypeEnum;

    
    @Column('varchar', {
        name: 'mtrs_per_cone',
        nullable: false
    })
    mtrsPerCone: string


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

    @ManyToOne(type => ThreadSupplierEntity, entity => entity.threadQty)
    @JoinColumn({ name: 'thread_supplier_id' })
    ThreadSupplier: ThreadSupplierEntity



}