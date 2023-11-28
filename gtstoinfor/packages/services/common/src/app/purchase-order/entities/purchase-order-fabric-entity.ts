import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { PurchaseOrderEntity } from "./purchase-order-entity";
import { PoItemEnum } from "@project-management-system/shared-models";

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


  @Column('text',{
    name:'remarks',
})
  remarks : string;


@Column('int',{
    name:'m3_fabric_code'
})
m3FabricCode:number

@Column('varchar',{
    name:'shahi_fabric_code'
})
shahiFabricCode:string



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

  @Column('int',{
    name:'indent_fabric_id',
    nullable:true
  })
  indentFabricId:number
  
  @Column('int',{
    name:'sample_req_fabric_id',
    nullable:true
  })
  sampleReqFabricId:number

  @Column('decimal',{
    name:'po_quantity',
    nullable:true
  })
  poQuantity:number

  @Column('int',{
    name:'quantity_uom_id',
    nullable:true
  })
  quantityUomId:number

  @Column('enum',{
    name:'fab_item_status',
    enum:PoItemEnum
  })
    fabricItemStatus:PoItemEnum

    @Column('decimal',{
      name:'grn_quantity',
      nullable:true
    })
    grnQuantity:number
    
@ManyToOne(type =>PurchaseOrderEntity,purchaseOrder =>purchaseOrder.poFabricInfo)
@JoinColumn({name:'purchase_order_id'})
purchaseOrderEntity:PurchaseOrderEntity

}