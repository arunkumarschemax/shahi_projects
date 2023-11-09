import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { StyleOrder } from "./style-order.entity";
import { Colour } from "../colours/colour.entity";
import { Destination } from "../destination/destination.entity";
import { Size } from "../sizes/sizes-entity";
import { UomEntity } from "../uom/uom-entity";
import { CoLineStatusEnum } from "@project-management-system/shared-models";

@Entity('order_lines')
export class CoLineEntity{

    @PrimaryGeneratedColumn("increment",{
        name:'id'
    })
    Id:number;

    @Column('varchar',{
        name:'buyer_po_number',
        nullable:false,
        length:50
    })
    buyerPoNumber : string;

    @Column('varchar',{
        name:'season_code',
        nullable:false,
        length:60
    })
    seasonCode : string;

    @Column('varchar',{
        name:'co_number',
        nullable:false
    })
    coNumber: string;

    @Column('varchar',{
        name:'order_number',
        nullable:false
    })
    orderNumber: string;
    
    @Column('varchar',{
        name:'sku_code',
        nullable:false
    })
    skuCode: string;
        
    @Column('varchar',{
        name:'delivery_address',
        nullable:false,
        length:60
    })
    deliveryAddress : string;

    @Column('int',{
        name:'order_quantity',
        nullable:false,
    })
    orderQuantity : number;

    @Column('varchar',{
        name:'color',
        nullable:false,
        length:30
    })
    color : string;

    @Column('enum',{
        name:'status',
        enum:CoLineStatusEnum,
        nullable:false
    })
    status : CoLineStatusEnum

    @Column('varchar',{
        name:'size',
        nullable:false,
        length:10

    })
    size: number

    @Column('varchar',{
        name:'destination',
        nullable:false,
        length:50

    })
    destination: number

   
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

    @Column({
        nullable: false,
        name: "delivery_date"
      })
      deliveryDate: Date;
    
      @Column({
        nullable: false,
        name: "exf_date"
      })
      exfDate: Date;

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

    @ManyToOne(type=>StyleOrder, co=>co.CoLineData,{  nullable:false, })
    @JoinColumn({ name:"co_id"})
    styleOrderInfo: StyleOrder;

    @ManyToOne(type=>Colour, color=>color.CoLineData,{  nullable:false, })
    @JoinColumn({ name:"color_id"})
    colorInfo: Colour;

    @ManyToOne(type=>Size, size=>size.CoLineData,{  nullable:false, })
    @JoinColumn({ name:"size_id"})
    sizeInfo: Size;

    @ManyToOne(type=>Destination, destination=>destination.CoLineData,{  nullable:false, })
    @JoinColumn({ name:"destination_id"})
    destinationInfo: Destination;

    @ManyToOne(type=>UomEntity, uom=>uom.CoLineData,{  nullable:true, })
    @JoinColumn({ name:"uom_id"})
    uomInfo: UomEntity;
}