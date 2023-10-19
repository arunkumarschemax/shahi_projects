import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Departments } from "../../departments/departments.entity";
import { SampleRequest } from "../../sample-dev-request/entities/sample-dev-request.entity";

@Entity('employee_details')
export class EmplyeeDetails {

  @PrimaryGeneratedColumn("increment",{name:'employee_id'})
  employeeId:number;

  @Column("char",{
    nullable:false,
    length:50,
    name:"employee_code"
    })
 employeeCode:string;

  @Column("char",{
      nullable:false,
      length:50,
      name:"first_name"
      })
  firstName:string;

  @Column("char",{
    nullable:false,
    length:50,
    name:"last_name"
    })
// @Index({ unique: true })
lastName:string;

@CreateDateColumn({
    name: "date_of_birth",
    type:"datetime"
  })
  dateOfBirth: Date;

  @Column("char",{
    nullable:false,
    length:50,
    name:"alter_native_number"
    })
    alterNativeMobileNumber: string;

  @Column("char",{
    nullable:false,
    length:50,
    name:"mobile_number"
    })
  mobileNumber: string;

  @Column("char",{
    nullable:false,
    length:50,
    name:"email"
    })
  emial: string;

  @Column("char",{
    nullable:false,
    length:200,
    name:"Address"
    })
  address: string;

  @Column("char",{
    nullable:false,
    length:50,
    name:"pin_code"
    })
  pinCode: number;

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

@Column("varchar", {
  nullable: true,
  name: "module",
  length:50
})
module: string | null;


  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  @ManyToOne(()=>Departments,department=>department.Depart)
  @JoinColumn({name:'dept_id'})
  Department:Departments

  @OneToMany(()=>SampleRequest, sampleReq => sampleReq.dmm, {cascade: true})
  sampleReq : SampleRequest[]

  @OneToMany(()=>SampleRequest, sampleReq => sampleReq.technician, {cascade: true})
  sampleRequest : SampleRequest[]
}
