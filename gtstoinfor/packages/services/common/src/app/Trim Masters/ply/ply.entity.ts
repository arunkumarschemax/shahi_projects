import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('ply')
export class PlyEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'ply_id'
    })
    plyId: number

    @Column('varchar',{
        name:'ply',
        length:50,
        nullable:false
    })
    ply: string

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