import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('backing_paper_v2')
export class BackingPaperV2 {
    @PrimaryGeneratedColumn('increment', {
        name: 'id'
    })
    id: number;

    @Column('text', {
        name: 'garment_colour_code',
        nullable: false
    })
    garmentColourCode: string

    @Column('varchar', {
        name: 'non_woven_colour',
        nullable: false
    })
    nonWovenColour: string

    @Column('varchar', {
        name: 'im_code',
        nullable: false
    })
    imCode: string


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

}