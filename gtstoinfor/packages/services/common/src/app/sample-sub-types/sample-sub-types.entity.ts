import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { SampleTypes } from "../sample Types/sample-types.entity";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";

@Entity('sample_sub_types')
export class SampleSubTypes {

  @PrimaryGeneratedColumn("increment",{name:'sample_sub_type_id'})
  sampleSubTypeId:number;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"sample_sub_type"
    })
  sampleSubType:string;
  
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
      default:"ADMIN",
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
   
  @ManyToOne(type=>SampleTypes, sampleTypes=>sampleTypes.subTypesInfo,{  nullable:false, })
  @JoinColumn({ name:"sample_type_id"})
  sampleSubTypes: SampleTypes;
  
  // @OneToMany(()=>SampleRequest, sampleReq => sampleReq.sampleSubType, {cascade: true})
  // sampleReq : SampleRequest[]

}
