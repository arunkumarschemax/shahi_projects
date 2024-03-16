import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ArticleEntity } from "../article/article.entity";

@Entity('length')
export class LengthEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'length_id'
    })
    lengthId: number

    @Column('varchar',{
        name:'length',
        length:50,
        nullable:false
    })
    length: string

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

    @OneToMany(()=>ArticleEntity,article=>article.lengthInfo,{cascade: true})
    articleInfo: ArticleEntity[]
}