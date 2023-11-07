import {  Column, Entity,PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity('group_tech_class')
export class GroupTechClassEntity  {

  @PrimaryGeneratedColumn("increment", { 
    name: 'group_tech_class_id' })
    groupTechClassId: number;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "group_tech_class_code"
  })
  groupTechClassCode: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "group_tech_class_description"
  })
  groupTechClassDescription: string;

  @Column("int", {
    nullable: false,
    name: "buyer_id" 
  })
  buyerId: number;

  @Column("int", {
    nullable: false,
    name: "division_id"
  })
  divisionId: number;


  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;
  @CreateDateColumn({
    name: "created_at",
    type: "datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
  })
  createdUser: string | null;


  @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user"
  })
  updatedUser: string | null;


  @VersionColumn({
    default: 1,
    name: "version_flag"
  })
  versionFlag: number;


}
