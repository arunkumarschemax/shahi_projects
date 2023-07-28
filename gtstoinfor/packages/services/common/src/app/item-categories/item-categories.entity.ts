import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";


@Entity('item_categories')
export class ItemCategory {

  @PrimaryGeneratedColumn("increment", { name: 'item_category_id' })
  itemCategoryId: number;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "item_category"
  })
  itemCategory: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "item_category_code"
  })
  itemCategoryCode: string;

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

  // @OneToMany(type => ItemSubCategory, item => item.itemCategory)
  // itemSubCategoryInfo: ItemSubCategory[];

  @OneToMany(() => ItemSubCategory, itemSubCategory => itemSubCategory.itemCategory)
  itemSubCategories: ItemSubCategory[];

  

  // @ManyToOne(type => Sizes, sizes => sizes.itemCategoryInfo, { nullable: true, })
  // @JoinColumn({ name: "size_id" })
  // sizeInfo: Sizes;

}
