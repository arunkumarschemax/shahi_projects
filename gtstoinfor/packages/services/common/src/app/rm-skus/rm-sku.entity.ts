import { RmItemTypeEnum, RmStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { FeatureSubstitution } from "../substituion/feature-substituion.entity";

@Entity('rm_skus')
export class RmSkus {

  @PrimaryGeneratedColumn("increment",{name:'rm_sku_id'})
  rmSkuId:number;

  @Column('int',{
    name:'rm_item_id',
    nullable:false
  })
  rmItemId : number

  @Column('varchar',{
    name:'item_type',
    nullable: false
  })
  itemType : string

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

  @Column('int',{
    name:'feature_option_id',
    nullable:false,
  })
  featureOptionId : number

  @Column('varchar',{
    name:'option_group',
    nullable:false,
    length: 30
  })
  optionGroup : string

  @Column('int',{
    name:'option_id',
    nullable:false,
  })
  optionId : number

  @Column('varchar',{
    name:'option_value',
    nullable:false,
    length: 30
  })
  optionValue : string

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

  @OneToMany(type=>FeatureSubstitution, item=>item.rmSkuInfo,{cascade: true})
  featureSubstitutionInfo:FeatureSubstitution;

}