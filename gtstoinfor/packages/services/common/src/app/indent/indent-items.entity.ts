import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { Indent } from "./indent-entity";

@Entity('indent_items')
export class IndentItemsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'indent_item_id' })
  indentItemId: number;

//   @Column("varchar", {
//     nullable: false,
//     length: 50,
//     name: "rm_item_code"
//   })
//   rmItemCode: string;

    @Column("int", {
    nullable: false,
    name: "rm_item_id"
    })
    rmItemId: number;
    @Column('decimal', {
      name: 'quantity',
    })
    quantity: number

        @Column('int',{
          name:'quantity_unit',
          nullable: false
          })
          quantityUnit: number;

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

  @Column('decimal', {
    name: 'received_quantity',
    default: 0,
  })
  recivedQuantity:number

  @ManyToOne(type => Indent, i => i.indentItemInfo, { nullable: false, })
  @JoinColumn({ name: "indent_id" })
  indentInfo: Indent;

}
