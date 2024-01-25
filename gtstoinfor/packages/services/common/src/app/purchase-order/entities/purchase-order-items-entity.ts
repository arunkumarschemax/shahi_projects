import { ItemTypeEnum, PoItemEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { PurchaseOrderEntity } from "./purchase-order-entity";

@Entity('purchae_order_items')
export class PurchaseOrderItemsEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'purchase_order_item_id'
    })
    purchaseOrderItemId:number

    @Column('int',{
        name:'colour_id',
        nullable:true,
      })
      colourId:number

      @Column('int',{
        name:'m3_item_id',
        nullable:false,
    })
  m3ItemId:number

  @Column({
    type: "decimal", precision: 10, scale: 3,
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
    name:'po_item_status',
    enum:PoItemEnum
  })
 poitemStatus:PoItemEnum

 @Column({
    type: "decimal", precision: 10, scale: 3,
    name:'grn_quantity',
    nullable:true,
    default:0
  })
  grnQuantity:number

  @Column('int',{
    name:'sample_item_id',
    nullable:true
  })
  sampleItemId:number

  @Column('int',{
    name:'indent_item_id',
    nullable:true
  })
  indentItemId:number

  @Column('int',{
        name:'style_id',
        nullable:false
    })
    styleId:number
  
  @Column('int',{
    name:'unit_price',
    nullable:true
  })
  unitPrice:number

    
  @Column('int',{
    name:'discount',
    nullable:true
  })
  discount:number

  @Column('int',{
    name:'tax',
    nullable:true
  })
  tax:number

  @Column('int',{
    name:'transportation',
    nullable:true
  })
  transportation:number

  @Column({
    type: "decimal", precision: 10, scale: 3,
    name:'subjective_amount',
    nullable:true
  })
  subjectiveAmount:number

  @Column('varchar',{
    name:'hsn_code'
  })
  hsnCode:string
  
  @Column('enum',{
    name:'item_type',
    nullable: true,
    enum:ItemTypeEnum,
  })
  materialType: ItemTypeEnum;

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
  
  @ManyToOne(type =>PurchaseOrderEntity,purchaseOrder =>purchaseOrder.poItemInfo)
  @JoinColumn({name:'purchase_order_id'})
  purchaseOrderEntity:PurchaseOrderEntity

  @Column('int',{
    name:'size_id',
    nullable:true
})
sizeId:number
  
@Column('varchar',{
  name:'item_description',
  nullable:true
})
itemDescription:string
}