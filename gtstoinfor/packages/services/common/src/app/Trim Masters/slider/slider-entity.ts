import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('slider')
export class SliderEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'slider_id'
    })
    sliderId: number

    @Column('varchar',{
        name:'slider',
        length:50,
        nullable:false
    })
    slider: string

    @Column('boolean',{
        name:'is_active',
        nullable:false,
        default:true
    })
    isActive: boolean

    @CreateDateColumn({
        name:'created_at',
        type:'datetime'
    })
    createdAt: Date

    @Column('varchar',{
        name:'created_user',
        default:'ADMIN',
        nullable:false,
        length:50
    })
    createdUser: string | null

    @UpdateDateColumn({
        name:'updated_at',
        type:'datetime'
    })
    updatedAt: Date

    @Column('varchar',{
        name:'updated_user',
        nullable:true,
        length:50
    })
    updatedUser: string | null

    @VersionColumn({
        default:1,
        name:'version_flag'
    })
    versionFlag: number
}