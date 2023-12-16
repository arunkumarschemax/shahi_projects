import { ItemTypeEnum, TypeEnum } from "@project-management-system/shared-models";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { M3ItemsEntity } from "./m3-items.entity";

@Entity('fabric_content')
export class FabricContentEntity {

  @PrimaryGeneratedColumn("increment", { name: 'fabric_content_id' })
  fabricContentId: number;

  @Column('varchar',{
    name:'content_id',
    nullable: false,
  })
  contentId: string;

  @Column('int',{
    name:'percentage',
    nullable: false,
  })
  percentage: number;

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

  @ManyToOne(type=>M3ItemsEntity,  m3Items=>m3Items.fabricContentInfo,{  nullable:false, })
  @JoinColumn({ name:"m3_items_id"})
  m3Items: M3ItemsEntity;

}