import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('color') 
export class ColorEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'color_id',
    })
    colorId: number

    @Column("varchar",{
        name:'color_code',
        nullable:false,
        
    })
    colorCode: string

    
    @Column("varchar",{
        name:'color_name',
        nullable:false,
        
    })
    colorName: string

    // @Column('varchar',{
    //     name:'rl_field',
    //     nullable:false,
       
    // })
    // rlField: string

    // @Column('varchar',{
    //     name:'crm_field',
    //     nullable:false,
    // })
    // crmField: string


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