
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { EmplyeeDetails } from "../employee-details/dto/employee-details-entity";


@Entity('departments')
export class Departments{

@PrimaryGeneratedColumn("increment",{name:'dept_id'})
deptId:number;
@Column("varchar",{
    // nullable: true,
    length:15,
    name:"dept_name"
})
deptName:string;

@Column("varchar", {
      // nullable: true,
      name: "dept_head"
    })
    deptHead: string;


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

@OneToMany(()=>EmplyeeDetails,Employee=>Employee.Department,{cascade:true})
Depart:EmplyeeDetails[];
}