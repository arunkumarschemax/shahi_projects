import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseOrderEntity } from "./purchase-order-entity";

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
        name:'trim_code',
        nullable:false
    })
    trimCode:number


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



    // @ManyToOne(type =>PurchaseOrderEntity,purchaseOrder =>purchaseOrder.poTrimInfo)
    // @JoinColumn({name:'purchase_order_id'})
    // purchaseOrderEntity:PurchaseOrderEntity

}