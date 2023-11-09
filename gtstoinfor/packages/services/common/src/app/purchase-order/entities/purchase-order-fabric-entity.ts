import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { PurchaseOrderEntity } from "./purchase-order-entity";

@Entity('purchase_order_fabric')
export class PurchaseOrderFbricEntity{
@PrimaryGeneratedColumn('increment',{
    name:'po_fabric_id'
})
poFabricId:number

@Column('int',{
    name:'colour_id',
    nullable:false,
  })
  colourId:number

  @Column('int',{
    name:'product_group_id',
    nullable:false,
  })
  productGroupId:number

  
  @Column('text',{
    name:'remarks',
})
  remarks : string;

@Column('varchar',{
    name:'fabric_type'
})
fabricType:string

@Column('varchar',{
    name:'fabric_code'
})
fabricCode:string


@Column('varchar',{
    name:'m3_fabric_code'
})
m3FabricCode:string

@Column('varchar',{
    name:'shahi_fabric_code'
})
shahiFabricCode:string

@Column('varchar',{
    name:'content'
})
content:string

@Column('int',{
    name:'weave_id'
})
weaveId:number

@Column('int',{
    name:'weight'
})
weight:number

@Column('int',{
    name:'width'
})
width:number

@Column('int',{
    name:'construction'
})
construction:number

@Column('int',{
    name:'yarn_count'
})
yarnCount:number

@Column('varchar',{
    name:'finish'
})
finish:string

@Column('varchar',{
    name:'shrinkage'
})
shrinkage:string

@Column('int',{
    name:'pch'
})
pch:number

@Column('varchar',{
    name:'moq'
})
moq:string

@CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "created_user",
  })
  createdUser: string | null;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "updated_user",
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag",
  })
  versionFlag: number;

  @Column({
    nullable: false,
    name: "is_active",
    default:1
  })
  isActive: boolean;

@ManyToOne(type =>PurchaseOrderEntity,purchaseOrder =>purchaseOrder.sampleReqFabricInfo)
@JoinColumn({name:'purchase_order_id'})
purchaseOrderEntity:PurchaseOrderEntity





















}