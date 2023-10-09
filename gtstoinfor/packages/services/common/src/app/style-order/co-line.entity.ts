import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { UomEntity } from "../uom/uom-entity";
import { StyleOrder } from "./style-order.entity";

@Entity('co_lines')
export class CoLine{

    @PrimaryGeneratedColumn("increment",{
        name:'id'
    })
    id:number;

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
        nullable:false,
        length:30
    })
    uom : string;

    @Column('enum',{
        name:'status',
        enum:CustomerOrderStatusEnum,
        nullable:false
    })
    status : CustomerOrderStatusEnum

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

    @ManyToOne(type=>StyleOrder, co=>co.coLineInfo,{  nullable:false, })
    @JoinColumn({ name:"co_id"})
    styleOrderInfo: StyleOrder;

    @ManyToOne(type=>Colour, color=>color.coLineInfo,{  nullable:false, })
    @JoinColumn({ name:"color_id"})
    colorInfo: Colour;

    @ManyToOne(type=>Size, size=>size.coLineInfo,{  nullable:false, })
    @JoinColumn({ name:"size_id"})
    sizeInfo: Size;

    @ManyToOne(type=>Destination, destination=>destination.coLineInfo,{  nullable:false, })
    @JoinColumn({ name:"destination_id"})
    destinationInfo: Destination;

    @ManyToOne(type=>UomEntity, uom=>uom.coLineInfo,{  nullable:false, })
    @JoinColumn({ name:"uom_id"})
    uomInfo: UomEntity;
}