import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FactoriesEntity } from "../factories/factories.entity";

@Entity('pattern')
export class PatternEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'pattern_id'
    })
    patternId: number

    @Column('varchar',{
        name:'pattern_name',
        length:50,
        nullable:false
    })
    patternName: string

    @Column('varchar',{
        name:'email',
        length:50,
        nullable:false
    })
    email: string

    // @Column('int',{
    //     name:'factory_location_id',
    //     nullable:false
    // })
    // factoryLocationId: number

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

    @ManyToOne(()=>FactoriesEntity, factory => factory.patternInfo, {nullable:false})
    @JoinColumn({name:'factory_location_id'})
    factoryInfo : FactoriesEntity
}