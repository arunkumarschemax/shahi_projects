import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { OperationGroups } from "../operation-groups/operation-groups.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";

@Entity('operations')
export class Operations {

  @PrimaryGeneratedColumn("increment",{name:'operation_id'})
  operationId:number;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"operation_code"
    })
    operationCode:string;

  @Column("varchar",{
    nullable:false,
    length:100,
    name:"operation_name"
    })
  operationName:string;
  
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
   
  @ManyToOne(type=>OperationGroups, operationGroups=>operationGroups.operationInfo,{  nullable:false, })
  @JoinColumn({ name:"operation_group_id"})
  operationGroupInfo: OperationGroups;

  @OneToMany(type=>OperationSequence, operation=>operation.operationsInfo,{cascade: true})
  operationSequenceInfo:OperationSequence;
  

}
