import { SkuStatusEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Item } from "../items/item-entity";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Style } from "../style/dto/style-entity";

@Entity('item_skus')
export class ItemSkus{
  
    @PrimaryGeneratedColumn("increment",{
        name:'item_sku_id'
    })
    itemSkuId:number;

    @Column('varchar',{
        name:'sku_code',
        nullable:false
    })
    skuCode : string;

    @Column('enum',{
        name:'status',
        enum: SkuStatusEnum,
        nullable:false
    })
    status : SkuStatusEnum;

    @Column('varchar',{
        name:'po_number',
        length:20,
        nullable:true
    })
    poNumber : string;

    @Column('varchar',{
        name:'po_line_number',
        length:20,
        nullable:true
    })
    poLineNumber : string;

    @Column('varchar',{
        name:'item_code',
        length:50,
        nullable:false
    })
    itemCode : string;

    @Column('varchar',{
        name:'size',
        length:10,
        nullable:false
    })
    size : string;

    @Column('varchar',{
        name:'color',
        length:10,
        nullable:false
    })
    color : string;

    @Column('varchar',{
        name:'destination',
        length:50,
        nullable:false
    })
    destination : string;

    @Column("boolean", {
        nullable: false,
        default: true,
        name: "is_active"
    })
    isActive: boolean;

    @CreateDateColumn({
    name: "created_at",
    type: "datetime"
    })
    createdAt: Date;

    @Column("varchar", {
    nullable: true,
    name: "created_user"
    })
    createdUser: string | null;


    @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
    })
    updatedAt: Date;

    @Column("varchar", {
    nullable: true,
    name: "updated_user"
    })
    updatedUser: string | null;


    @VersionColumn({
    default: 1,
    name: "version_flag"
    })
    versionFlag: number;

    @ManyToOne(type=>Item, item=>item.itemSkuInfo,{  nullable:false, })
    @JoinColumn({ name:"item_id"})
    itemInfo: Item;

    @ManyToOne(type=>Colour, color=>color.itemSkuInfo,{  nullable:false, })
    @JoinColumn({ name:"color_id"})
    colorInfo: Colour;

    @ManyToOne(type=>Size, size=>size.itemSkuInfo,{  nullable:false, })
    @JoinColumn({ name:"size_id"})
    sizeInfo: Size;

    @ManyToOne(type=>Destination, destination=>destination.itemSkuInfo,{  nullable:false, })
    @JoinColumn({ name:"destination_id"})
    destinationInfo: Destination;

    @ManyToOne(type=>Style, style=>style.itemSkuInfo,{  nullable:false, })
    @JoinColumn({ name:"style_id"})
    styleInfo: Style;
    

}