import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ThreadQtyEntity } from "../thread-qty/thread-qty.entity";

@Entity('thread_supplier')
export class ThreadSupplierEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'thread_supplier_id'
    })
    threadSupplierId: number;

    @Column('varchar', {
        name: 'supplier_name',
        nullable: false
    })
    supplierName: string


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

    @OneToMany(type => ThreadQtyEntity, entity => entity.ThreadSupplier)
    threadQty: ThreadQtyEntity

 
}