// import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

// @Entity('departments')
// export class Departments {

//   @PrimaryGeneratedColumn("increment", { name: 'dept_id' })
//   deptId: number;

//   @Column("varchar", {
//     nullable: false,
//     length: 50,
//     name: "dept_name"
//   })
//   @Index({ unique: true })
//   deptName: string;

//   @Column("int", {
//     nullable: true,
//     name: "dept_head"
//   })
//   deptHead: number;

//   @Column("boolean", {
//     nullable: false,
//     default: true,
//     name: "is_active"
//   })
//   isActive: boolean;

//   @CreateDateColumn({
//     name: "created_at",
//     type: "datetime"
//   })
//   createdAt: Date;

//   @Column("varchar", {
//     nullable: false,
//     name: "created_user",
//     length: 50
//   })
//   createdUser: string | null;


//   @UpdateDateColumn({
//     name: "updated_at",
//     type: 'datetime'
//   })
//   updatedAt: Date;

//   @Column("varchar", {
//     nullable: true,
//     name: "updated_user",
//     length: 50
//   })
//   updatedUser: string | null;

//   @VersionColumn({
//     default: 1,
//     name: "version_flag"
//   })
//   versionFlag: number;
// }

import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";


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
}