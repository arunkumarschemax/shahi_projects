import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

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
 
 
  @Column("int", {
    nullable: false,
    name: "item_category_id" ///// need to add foriegn key
  })
  itemCategoryId: number;

  @Column("int", {
    nullable: false,
    name: "item_sub_category_id" /// foregn key
  })
  itemSubCategoryId: number;

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


}
