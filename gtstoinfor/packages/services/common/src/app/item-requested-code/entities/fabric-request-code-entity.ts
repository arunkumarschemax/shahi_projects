import { MaterialFabricEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('fabric_request_code')
export class FabricRequestCodeEntity {

  @PrimaryGeneratedColumn("increment", { name: 'fabric_request_code_id' })
  fabricRequestCodeId: number;
  
  @Column('int', {
    nullable: false,
    name: 'buyer_id',
  })
  buyerId: number;

  @Column('int', {
    nullable: true,
    name: 'fabric_type_id',
  })
  fabricTypeId: number;

  @Column('int', {
    nullable: true,
    name: 'weave_id',
  })
  weaveId: number;

  @Column('int', {
    nullable: true,
    name: 'weight',
  })
  weight: number;

  @Column('int', {
    nullable: true,
    name: 'weight_unit',
  })
  weightUnit: number;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'epi_construction',
  })
  epiConstruction: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'ppi_construction',
  })
  ppiConstruction: string;

  @Column('varchar', {
    nullable: true,
    name: 'yarn_type',
  })
  yarnType: string;

  @Column('int', {
    nullable: false,
    name: 'width',
  })
  width: number;

  @Column('int', {
    nullable: true,
    name: 'width_unit',
  })
  widthUnit: number;

  @Column('int', {
    nullable: true,
    name: 'finish_id',
  })
  finishId: number;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'shrinkage',
  })
  shrinkage: string;

  @Column("int", {
    nullable: true,
    name: "content_id"
  })
  contentId: number;

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'hsn_code',
  })
  hsnCode: string;

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'm3_code',
  })
  m3Code: string;

  @Column('enum',{
    name:'status',
    nullable: true,
    enum:MaterialFabricEnum,
  })
  status: MaterialFabricEnum;

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