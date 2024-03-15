import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('threads')
export class ThreadsEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'thread_id'
    })
    threadId: number;

    @Column('int', {
        name: 'style_Id',
        nullable: false
    })
    styleId: number

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

    
    @Column('varchar', {
        name: 'color_combo',
        nullable: false
    })
    colorCombo: string

    @Column('varchar', {
        name: 'color_code',
        nullable: false
    })
    colorCode: string

    @Column('varchar', {
        name: 'shade_number',
        nullable: false
    })
    shadeNumber: string

    @Column('int', {
        name: 'supplier_Id',
        nullable: false
    })
    supplierId: number

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

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



}