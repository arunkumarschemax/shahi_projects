import { ItemTypeEnum, TypeEnum } from "@project-management-system/shared-models";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { M3ItemsEntity } from "./m3-items.entity";

@Entity('fabric_yarn')
export class FabricYarnEntity {

  @PrimaryGeneratedColumn("increment", { name: 'fabric_yarn_id' })
  fabricYarnId: number;

  @Column('varchar',{
    name:'yarn_type',
    nullable: false,
  })
  yarnType: string;

  @Column('int',{
    name:'count',
    nullable: false,
  })
  count: number;

  @Column('int',{
    name:'uom_id',
    nullable: false,
  })
  uomId: number;

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

  @ManyToOne(type=>M3ItemsEntity,  m3Items=>m3Items.fabricYarnInfo,{  nullable:false, })
  @JoinColumn({ name:"m3_items_id"})
  m3Items: M3ItemsEntity;

}