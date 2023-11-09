import { PurchaseOrderStatus } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { PurchaseOrderFbricEntity } from "./purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "./purchase-order-trim-entity";

@Entity('purchase_order')
export class PurchaseOrderEntity{
    @PrimaryGeneratedColumn('increment',{
        name:'purchase_order_id'
    })
    purchaseOrderId:number

    @Column('varchar',{
        name:'po_number',
        nullable:false
    })
    poNumber:string

    @Column('int',{
        name:'vendor_id',
        nullable:false
    })
    vendorId:number

    @Column('int',{
        name:'style_id',
        nullable:false
    })
    styleId:number


    @Column('date',{
        name:'expected_delivery_date',
        nullable:false
    })
    expectedDeliveryDate:Date

    @Column('date',{
        name:'purchase_order_date',
        nullable:false
    })
    purchaseOrderDate:Date

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

      @Column('enum',{
        name:'status',
        enum:PurchaseOrderStatus
      })
        status:PurchaseOrderStatus

    @Column('text',{
        name:'remarks',
        nullable:true
    })
    remarks:string
    
  @OneToMany(type => PurchaseOrderFbricEntity, purchaseReqFabric => purchaseReqFabric.purchaseOrderEntity, { cascade: true })
  poFabricInfo: PurchaseOrderFbricEntity[]

  // @OneToMany(type => PurchaseOrderTrimEntity, poTrimReq => poTrimReq.purchaseOrderEntity, { cascade: true })
  // poTrimInfo: PurchaseOrderTrimEntity[]


}