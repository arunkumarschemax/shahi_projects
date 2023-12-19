import { RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('racks')
export class RacksEntity {
  @PrimaryGeneratedColumn("increment", { name: 'rack_Id' })
  rackId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'rack_name',
  })
  rackName: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'rack_code',
  })
  rackCode: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'unit',
  })
  unit: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'rack_type',
  })
  rackType: RackEnum;

  @Column('int',{
    name:'levels',
    nullable:false,
  })
  levels:number

  @Column('int',{
    name:'columns',
    nullable:false,
  })
  columns:number

  @Column('int',{
    name:'priority',
    nullable:false,
  })
  priority:number
  
  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'barcode_id',
  })
  barcodeId: string;

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