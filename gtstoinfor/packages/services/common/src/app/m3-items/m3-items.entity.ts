import { RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "../buyers/buyers.entity";

@Entity('m3_items')
export class M3ItemsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'm3_items_Id' })
  m3ItemsId: number;

  // @Column("varchar", { 
  //   name: 'item_code'
  //  })
  // itemCode: string;

  @Column('varchar', {
    name: 'item_code',
    // default: () => "'FAB' || LPAD(nextval('item_code_seq')::text, 3, '0')",
    unique: true,
  })
  itemCode: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'description',
    unique: true,
  })
  description: string;


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
  fabricType: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'weave',
  })
  weave: number;

  @Column('varchar', {
    nullable: false,
    length: 11,
    name: 'weight',
  })
  weight: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'weight_unit',
  })
  weightUnit: string;

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
    name: 'yarn_unit',
  })
  yarnUnit: string;

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

  @ManyToOne(type=>Buyers, m3Items=>m3Items.M3ItemCodes,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;

}