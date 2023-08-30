import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { Item } from "../items/item-entity";


@Entity('item_sub_categories')
export class ItemSubCategory {

  @PrimaryGeneratedColumn("increment", { name: 'item_sub_category_id' })
  itemSubCategoryId: number;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "item_sub_category"
  })
  itemSubCategory: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "category_code"
  })
  itemSubCategoryCode: string;

  @Column("varchar", {
    nullable: true,
    length: 255,
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

  @ManyToOne(() => ItemCategory, itemCategory => itemCategory.itemSubCategories)
  @JoinColumn({ name: 'item_category_id' })
  itemCategory: ItemCategory;

  // @OneToMany(type => Item, item => item.itemSubCategory)
  // itemInfo: Item[];

  // @ManyToOne(type => Sizes, sizes => sizes.itemCategoryInfo, { nullable: true, })
  // @JoinColumn({ name: "size_id" })
  // sizeInfo: Sizes;

  @OneToMany(() => Item,item =>item.itemSubCategory)
  item:Item[]
}
