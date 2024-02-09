import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('color') 
export class ColorEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'color_id',
    })
    colorId: number

    @Column("varchar",{
        name:'po_number',
        nullable:false,
        
    })
    poNumber: string

    
    @Column("varchar",{
        name:'style',
        nullable:false,
        
    })
    style: string

    @Column('varchar',{
        name:'rl_field',
        nullable:false,
       
    })
    rlField: number

    @Column('varchar',{
        name:'crm_field',
        nullable:false,
    })
    crmField: string


    @Column({
        nullable: false,
        name: "is_active",
        default:1
    })
    isActive: boolean;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'created_user'
    })
    createdUser: string | null;

    @Column('varchar', {
        nullable: true,
        length: 20,
        name: 'updated_user'
    })
    updatedUser: string | null;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;

    @VersionColumn({
        default: 1,
        name: "version_flag",
    })
    versionFlag: number;

    
}