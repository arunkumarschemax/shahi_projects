import { RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('m3_items')
export class M3ItemsEntity {
  @PrimaryGeneratedColumn("increment", { name: 'item_code' })
  itemCode: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'content',
  })
  content: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'fabric_type',
  })
  fabricType: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'weave',
  })
  weave: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'weight',
  })
  weight: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'construction',
  })
  construction: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'yarn_count',
  })
  yarnCount: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'finish',
  })
  finish: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'shrinkage',
  })
  shrinkage: string;


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

}