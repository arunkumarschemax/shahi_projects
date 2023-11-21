import { RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "../buyers/buyers.entity";

@Entity('m3_trims')
export class M3TrimsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'm3_trim_Id' })
  m3TrimId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'trim_code',
  })
  trimCode: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'trim_type',
  })
  trimType: string;

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

  @ManyToOne(type=>Buyers, m3Trims=>m3Trims.M3TrimCodes,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;

}