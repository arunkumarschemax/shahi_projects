import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { UomEntity } from "../uom/uom-entity";
import { StyleOrder } from "./style-order.entity";

@Entity('order_lines')
export class OrderLine{

    @PrimaryGeneratedColumn("increment",{
        name:'order_line_id'
    })
    orderLineId:number;

    // @Column('varchar',{
    //     name:'coline_number',
    //     nullable:false,
    //     length:50
    // })
    // coLineNumber : string;

    @Column('varchar',{
        name:'delivery_address',
        nullable:false,
        length:60
    })
    deliveryAddress : string;

    @Column('int',{
        name:'order_quantity',
        nullable:false
    })
    orderQuantity: number;

    @Column('varchar',{
        name:'color',
        nullable:false,
        length:30
    })
    color : string;

    @Column('varchar',{
        name:'size',
        nullable:false,
        length:30
    })
    size : string;

    @Column('varchar',{
        name:'destination',
        nullable:false,
        length:60
    })
    destination : string;

    @Column('varchar',{
        name:'uom',
        nullable:true,
        length:30
    })
    uom : string;

    // @Column('enum',{
    //     name:'status',
    //     enum:CustomerOrderStatusEnum,
    //     nullable:false
    // })
    // status : CustomerOrderStatusEnum

    @Column('decimal',{
        name:'discount',
        nullable:true
    })
    discount: number

    @Column('decimal',{
        name:'sale_price',
        nullable:true
    })
    salePrice: number

    @Column('decimal',{
        name:'co_percentage',
        nullable:true
    })
    coPercentage: number

    @Column("boolean",{
    nullable:false,
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
        nullable: false,
        name: "created_user",
        default:"ADMIN",
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

    @Column("varchar", {
    nullable: true,
    name: "sku_code",
    length:50
    })
    skuCode: string;

    @ManyToOne(type=>StyleOrder, co=>co.orderLineInfo,{  nullable:false, })
    @JoinColumn({ name:"co_id"})
    styleOrderInfo: StyleOrder;

    @ManyToOne(type=>Colour, color=>color.orderLineInfo,{  nullable:false, })
    @JoinColumn({ name:"color_id"})
    colorInfo: Colour;

    @ManyToOne(type=>Size, size=>size.orderLineInfo,{  nullable:false, })
    @JoinColumn({ name:"size_id"})
    sizeInfo: Size;

    @ManyToOne(type=>Destination, destination=>destination.orderLineInfo,{  nullable:false, })
    @JoinColumn({ name:"destination_id"})
    destinationInfo: Destination;

    @ManyToOne(type=>UomEntity, uom=>uom.orderLineInfo,{  nullable:true, })
    @JoinColumn({ name:"uom_id"})
    uomInfo: UomEntity;
}