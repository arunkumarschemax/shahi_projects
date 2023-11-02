import { RmItemTypeEnum, RmStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('rm_skus')
export class RmSkus {

  @PrimaryGeneratedColumn("increment",{name:'rm_sku_id'})
  rmSkuId:number;

  @Column('int',{
    name:'rm_item_id',
    nullable:false
  })
  rmItemId : number

  @Column('enum',{
    name:'item_type',
    enum:RmItemTypeEnum,
    nullable: false
  })
  itemType : RmItemTypeEnum

  @Column('varchar',{
    name:'rm_sku_code',
    nullable:false,
    length: 30
  })
  rmSkuCode : string

  @Column('varchar',{
    name:'feature_code',
    nullable:false,
    length: 30
  })
  featureCode : string

  @Column('enum',{
    name:'status',
    nullable:false,
    enum: RmStatusEnum
  })
  status : RmStatusEnum

  @Column('varchar',{
    name:'item_code',
    nullable:false,
    length: 30
  })
  itemCode : string

  @Column("boolean",{
    default:true,
    name:"is_active"
    })
  isActive:boolean;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
})
createdUser: string | null;

@UpdateDateColumn({
    name: "updated_at",
    type:'datetime'
})
updatedAt: Date;

@Column("varchar", {
    nullable: true,
    name: "updated_user"
})
updatedUser: string | null;

@VersionColumn({
    default:1,
    name: "version_flag"
})
versionFlag: number;

}