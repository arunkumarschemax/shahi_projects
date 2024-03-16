import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Vendors } from "../../vendors/vendors.entity";
import { LengthEntity } from "../length/length-entity";

@Entity('article')
export class ArticleEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'article_id'
    })
    articleId:number

    @Column('varchar',{
        name:'article_name',
        length:50,
        nullable:false
    })
    articleName: string

    @Column("varchar",{
        name:'text',
        length:50,
        nullable: true
    })
    text: string

    @CreateDateColumn({
        name:'created_at',
        nullable:false
    })
    createdAt:Date

    @Column('varchar',{
        name:'created_user',
        length:20
    })
    createdUser: string

    @UpdateDateColumn({
        name:'updated_at'
    })
    updatedAt: Date

    @Column('varchar',{
        name:"updated_user",
        length:20
    })
    updatedUser: string

    @Column('boolean',{
        name:'is_active',
        nullable:false,
        default:true
    })
    isActive: boolean

    @VersionColumn({
        default:1,
        name:'version_flag'
    })
    versionFlag: number

    @ManyToOne(()=>Vendors,vendor=>vendor.articleInfo,{nullable:false})
    @JoinColumn({name:'supplier_id'})
    VendorInfo: Vendors

    @ManyToOne(()=>LengthEntity,length=>length.articleInfo,{nullable:false})
    @JoinColumn({name:'length_id'})
    lengthInfo: LengthEntity
}