import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Operations } from "../operations/operation.entity";

@Entity('sample_types')
export class SampleTypes {

  @PrimaryGeneratedColumn("increment",{name:'smaple_type_id'})
  smapleTypeId:number;

  @Column("varchar",{
    nullable:false,
    length:50,
    name:"sample_type"
    })
    sampleType:string;

  @Column("boolean",{
    nullable:false,
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
    nullable: false,
    name: "created_user",
    length:50
})
createdUser: string | null;


  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length:50
})
updatedUser: string | null;


  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

//   @OneToMany(type=>SampleSubTypes, subType=>subtype.sampleSubTypes,{cascade: true})
//   subTypesInfo:SampleSubTypes;

}
