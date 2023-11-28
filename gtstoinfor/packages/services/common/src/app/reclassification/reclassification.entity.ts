import { RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('reclassification')
export class ReclassificationEntity {
  @PrimaryGeneratedColumn("increment", { name: 'reclassification_id' })
  reclassificationId: number;

  @Column('int', {
    nullable: false,
    name: 'stock_id',
  })
  stockId: number;

  @Column('int', {
    nullable: false,
    name: 'quantity',
  })
  quantity: number;

  @Column('int', {
    nullable: false,
    name: 'item_id',
  })
  itemId: number;

  @Column('int', {
    nullable: false,
    name: 'location',
  })
  location: number;

  @Column('int', {
    nullable: false,
    name: 'buyer',
  })
  buyer: number;

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