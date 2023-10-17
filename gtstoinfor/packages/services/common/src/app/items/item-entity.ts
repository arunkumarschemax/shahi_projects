import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { StyleOrder } from "../style-order/style-order.entity";

@Entity('items')
export class Item {

  @PrimaryGeneratedColumn("increment", { name: 'item_id' })
  itemId: number;

  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "item_name"
  })
  itemName: string;


  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "item_code"
  })
  itemCode: string;

  @ManyToOne(() => ItemCategory, (item) => item.item)
  @JoinColumn({ name: 'item_category_id' })
  itemCategory: ItemCategory;


  @ManyToOne(() => ItemSubCategory, (itemSubCat) => itemSubCat.item)
  @JoinColumn({ name: 'item_sub_category_id' })
  itemSubCategory: ItemSubCategory;

  @Column("int", {
    nullable: false,
    name: "brand_id" /// foregn key
  })
  brandId: number;

  @Column("int", {
    nullable: true,
    default: 0,
    name: "min_qnty"
  })
  minQuantity?:number

  
  @Column("int", {
    nullable: false,
    name: "uom_id" /// foregn key
  })
  uomId: number;

  @Column("varchar", {
    nullable: true,
    length: 50,
    name: "remarks"
  })
  remarks: string;


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

  // @OneToMany(type=>OperationSequence, operation=>operation.itemInfo,{cascade: true})
  // itemsequenceInfo:OperationSequence;


}
