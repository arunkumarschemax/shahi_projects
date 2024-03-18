import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


@Entity('hm_sheet')
export class HMStyleEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'hm_id'
    })
    hmId: number;

    @Column('varchar',{
        name:'style_number',
        nullable:false
    })
    styleNumber:string

    @Column('varchar',{
        name:'teflon_sheet_size',
        nullable:false
    })
    teflonSheetSize:string

    @Column('varchar',{
        name:'consumption',
        nullable:false
    })
    consumption:string;
    

    @CreateDateColumn({
        name: 'created_at',
        nullable:true
    })
    createdAt: Date;

    @Column('varchar', {
        nullable: true,
        length: 40,
        name: 'created_user'
    })
    createdUser: string | null;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable:true
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