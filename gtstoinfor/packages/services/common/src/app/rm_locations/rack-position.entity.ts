import { RackPositionStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Columns } from "../cloumn/column.entity";
import { Levels } from "../level/level.entity";

@Entity('rack_position')
export class RackPositionEntity {
  @PrimaryGeneratedColumn("increment", { name: 'position_Id' })
  positionId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'rack_position_name',
  })
  rackPositionName: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'position_code',
  })
  positionCode: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'rack_name',
  })
  rackName: string;

  @Column('enum',{
    name:'status',
    enum: RackPositionStatusEnum
})
status: RackPositionStatusEnum;

  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
  })
  createdUser: string | null;

  @Column("varchar", {
    nullable: true,
    name: "updated_user"
  })
  updatedUser: string | null;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: string;

  @VersionColumn({
    default: 1,
    name: 'version_flag'
  })
  versionFlag: number;

  @Column('int', {
    nullable: false,
    name: 'column_id',
  })
  columnId: number;

  @Column('int', {
    nullable: false,
    name: 'level_Id',
  })
  levelId: number;




}