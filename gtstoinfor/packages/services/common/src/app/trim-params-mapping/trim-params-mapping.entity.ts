import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Settings } from "../settings/settings.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { RackPositionEntity } from "../rm_locations/rack-position.entity";
import { ItemTypeEnum } from "@project-management-system/shared-models";

@Entity('trim_params_mapping')
export class TrimParamsMapping{

  @PrimaryGeneratedColumn("increment",{name:'trim_mapping_id'})
  trimMappingId:number;

  @Column("int",{
    nullable:false,
    name:"trim_id"
  })
  trimId:number;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"category"
  })
  category:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"color"
  })
  color:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"content"
  })
  content:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"finish"
  })
  finish:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"hole"
  })
  hole:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"logo"
  })
  logo:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"part"
  })
  part:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"quality"
  })
  quality:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"structure"
  })
  structure:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"thickness"
  })
  thickness:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"type"
  })
  type:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"uom"
  })
  uom:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"variety"
  })
  variety:boolean;

  @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
  })
  isActive:boolean;

  
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"shape"
  })
  shape:boolean;
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"line"
  })
  line:boolean;
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"ply"
  })
  ply:boolean;
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"buyer"
  })
  buyer:boolean;
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"length"
  })
  length:boolean;

  
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"slider"
  })
  slider:boolean;
  
  @Column("boolean",{
    nullable:false,
    default:false,
    name:"parts"
  })
  parts:boolean;

  @Column("boolean",{
    nullable:false,
    default:false,
    name:"size"
  })
  size:boolean;
  
  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
      nullable: false,
      name: "created_user",
      default: "ADMIN",
      length:50
  })
  createdUser: string | null;


  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
      nullable: true,
      name: "updated_user",
      length:50
  })
  updatedUser: string | null;

  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;



@Column('enum', {
  name: 'trim_type',
  nullable: false,
  enum: ItemTypeEnum
})
trimType: ItemTypeEnum;
  @OneToMany(type=>TrimParamsMapping, map=>map.trimMappingId,{cascade: true})
  trimMappingInfo:TrimParamsMapping;


}