import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderEntity } from "./purchase-order-entity";
import { Col } from "antd";
import { PoItemEnum } from "@project-management-system/shared-models";

@Entity('purchase_order_trim')
export class PurchaseOrderTrimEntity{

    @PrimaryGeneratedColumn('increment',{
        name:'po_trim_id'
    })
    poTrimId:number

    @Column('int',{
        name:'product_group_id',
        nullable:false
    })
    productGroupId:number

    @Column('int',{
        name:'trim_id',
        nullable:false
    })
    trimId:number

    @Column('int',{
        name:'colour_id',
        nullable:false
    })
    colourId:number

    @Column('text', {
        name: 'description',
        nullable: false
    })
    description: string

    @Column('decimal', {
        name: 'consumption',
        precision: 4,
        scale: 2,
    })
    consumption: number
    @Column('text', {
        name: 'remarks',
        nullable: true
    })
    remarks: string
    
    @Column('text', {
        name: 'm3_trim_code',
        nullable: true
    })
    m3TrimCode: string
    
    @Column('int',{
        name:'indent_id',
        nullable:true
      })
      indentId:number
      
      @Column('int',{
        name:'sample_request_id',
        nullable:true
      })
      sampleRequestId:number

    @Column('decimal',{
        name:'po_quantity',
        nullable:false
    })
    poQuantity:number

    @Column('int',{
        name:'quantity_uom_id',
        nullable:false
    })
    quantityUomId:number

    @Column('enum',{
        name:'trim_item_status',
        enum:PoItemEnum
      })
        trimItemStatus:PoItemEnum

        
    @Column('decimal',{
        name:'grn_quantity',
        nullable:true
      })
      grnQuantity:number
      
    @ManyToOne(type =>PurchaseOrderEntity,purchaseOrder =>purchaseOrder.poTrimInfo)
    @JoinColumn({name:'purchase_order_id'})
    purchaseOrderEntity:PurchaseOrderEntity

}