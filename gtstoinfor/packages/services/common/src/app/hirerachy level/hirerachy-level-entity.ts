import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";


@Entity('hierarchy_level')
export class HierarchyLevel{

@PrimaryGeneratedColumn("increment",{name:'hierarchy_level_id'})
hierarchyLevelId:number;

@Column("varchar",{
    nullable: true,
    length:15,
    name:"hierarchy_name"
})
hierarchyName:string;


@Column('varchar', {
    name: 'level_1',
    nullable: false
})
level1: string;

@Column('varchar', {
    name: 'level_1_Code',
    nullable: false
})
level1Code: string;

@Column('varchar', {
    name: 'level_2',
    nullable: false
})
level2: string;

@Column('varchar', {
    name: 'level_2_Code',
    nullable: false
})
level2Code: string;

@Column('varchar', {
    name: 'level_3',
    nullable: false
})
level3: string;

@Column('varchar', {
    name: 'level_3_Code',
    nullable: false
})
level3Code: string;

@Column('varchar', {
    name: 'level_4',
    nullable: false
})
level4: string;

@Column('varchar', {
    name: 'level_4_Code',
    nullable: false
})
level4Code: string;

@Column('varchar', {
    name: 'level_5',
    nullable: false
})
level5: string;

@Column('varchar', {
    name: 'level_5_Code',
    nullable: false
})
level5Code: string;


@Column("boolean",{
    default:true,
    name:"is_active"
    })
  isActive:boolean;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
})
createdUser: string | null;

@UpdateDateColumn({
    name: "updated_at",
    type:'datetime'
})
updatedAt: Date;

@Column("varchar", {
    nullable: true,
    name: "updated_user"
})
updatedUser: string | null;

@VersionColumn({
    default:1,
    name: "version_flag"
})
versionFlag: number;

}
