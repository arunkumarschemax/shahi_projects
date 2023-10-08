import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Operations } from "../operations/operation.entity";
import { SampleSubTypes } from "../sample-sub-types/sample-sub-types.entity";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";

@Entity('sample_types')
export class SampleTypes {

  @PrimaryGeneratedColumn("increment",{name:'sample_type_id'})
  sampleTypeId:number;

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

  @OneToMany(type=>SampleSubTypes, subType=>subType.sampleSubTypes,{cascade: true})
  subTypesInfo:SampleSubTypes;

  @OneToMany(()=>SampleRequest, sampleReq => sampleReq.sampleType, {cascade: true})
  sampleReq : SampleRequest[]

}
