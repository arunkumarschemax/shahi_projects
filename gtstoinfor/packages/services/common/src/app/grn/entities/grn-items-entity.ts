import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { GrnEntity } from "./grn-entity";
import { LocationMappedEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { PurchaseOrderFbricEntity } from "../../purchase-order/entities/purchase-order-fabric-entity";
import { PurchaseOrderTrimEntity } from "../../purchase-order/entities/purchase-order-trim-entity";

@Entity('grn_items')
export class GrnItemsEntity{

    @PrimaryGeneratedColumn('increment',{
        name:'grn_item_id'
    })
    grnItemId:number

    @Column('int',{
        name:'item_id'
    })
    itemId:number

    @Column('int',{
        name:'m3_item_id'
    })
    m3ItemId:number

    @Column('int',{
        name:'product_group_id',
        nullable:false,
    })
    productGroupId:number

    @Column('varchar',{
        name:'received_quantity',
        nullable:false
    })
    receivedQuantity:string

    @Column('int',{
        name:'received_uom_id',
        nullable:false
    })
    receivedUomId:number

    @Column('varchar',{
        name:'accepted_quantity',
        nullable:false
    })
    acceptedQuantity:string

    @Column('int',{
        name:'accepted_uom_id',
        nullable:false
    })
    acceptedUomId:number

    @Column('varchar',{
        name:'rejected_quantity',
        nullable:false
    })
    rejectedQuantity:string

    @Column('int',{
        name:'rejected_uom_id',
        nullable:false
    })
    rejectedUomId:number

    @Column('varchar',{
        name:'conversion_quantity',
        nullable:false
    })
    conversionQuantity:string

    @Column('int',{
        name:'conversion_uom_id',
        nullable:false
    })
    conversionUomId:number

    @Column('enum',{
        name:'location_mapped_status',
        enum:LocationMappedEnum
    })
    status:LocationMappedEnum

    @Column('text',{
        name:'remarks',
        nullable:true
    })
    remarks:string

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


    @ManyToOne(type =>GrnEntity,grn =>grn.grnItemInfo)
    @JoinColumn({name:'grn_id'})
    grnEntity:GrnEntity



}