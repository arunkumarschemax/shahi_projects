import { SubContractStatus } from "@project-management-system/shared-models";
import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { StyleOrder } from "../style-order/style-order.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";

@Entity('fg_item')
export class ItemCreation {

  @PrimaryGeneratedColumn("increment", { name: 'fg_item_id' })
  fgitemId: number;

  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "item_name"
  })
  itemName: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "item_code"
  })
  itemCode: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "description"
  })
  description: string;

  @Column("int", {
    nullable: false,
    name: "item_type_id" /// foregn key
  })
  itemTypeId: number;

  @Column("int", {
    nullable: true,
    name: "brand_id" /// foregn key
  })
  brandId: number;

  @Column("int", {
    nullable: true,
    name: "category_id" /// foregn key
  })
  categoryId: number;

  @Column("int", {
    nullable: true,
    name: "sub_category_id" /// foregn key
  })
  subCategoryId: number;

  @Column("varchar", {
    nullable: true,
    name: "season" /// foregn key
  })
  season: string;

  @Column("int", {
    nullable: true,
    name: "responsible_person_id" /// foregn key
  })
  responsiblePersonId: number;

  @Column("int", {
    nullable: true,
    name: "product_designer_id" /// foregn key
  })
  productDesignerId: number;

  @Column("int", {
    nullable: true,
    name: "approver" /// foregn key
  })
  approver: number;

  @Column("int", {
    nullable: true,
    name: "production_merchant" /// foregn key
  })
  productionMerchant: number;

  @Column("int", {
    nullable: true,
    name: "pd_merchant" /// foregn key
  })
  pdMerchant: number;

  @Column("int", {
    nullable: true,
    name: "factory_merchant" /// foregn key
  })
  factoryMerchant: number;

  @Column("int", {
    nullable: false,
    name: "sale_person_id" /// foregn key
  })
  salePersonId: number;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "style_no"
  })
  styleNo: string;
  
  @Column("int", {
    nullable: false,
    name: "internal_style_id" /// foregn key
  })
  internalStyleId: number;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "uom"
  })
  uom: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "alt_uom"
  })
  altUoms: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "currency"
  })
  currency: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "item_group"
  })
  itemGroup: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "product_group"
  })
  productGroup: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "business_area"
  })
  businessArea: string;

  @Column("varchar", {
    nullable: false,
    length: 40,
    name: "basic_uom"
  })
  basicUom: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "group_tech_class"
  })
  groupTechClass: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "composition"
  })
  composition: string;


  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "target_currency"
  })
  targetCurrency: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "range"
  })
  range: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "no_of_lace_panel"
  })
  noOfLacePanel: string;

  @Column("int", {
    nullable: true,
    name: "search_group"
  })
  searchGroup: number;
  
  @Column("varchar", {
    nullable: false,
    name: "conversion_factor" /// foregn key
  })
  conversionFactor:string ;

  @Column("varchar", {
    nullable: true,
    name: "reference" /// foregn key
  })
  reference: string;

  @Column("varchar", {
    nullable: false,
    name: "projection_order" /// foregn key
  })
  projectionOrder: string;

  @Column("int", {
    nullable: true,
    name: "buying_house_commision_id" /// foregn key
  })
  buyingHouseCommision: number;

  @Column("int", {
    nullable: false,
    default: "0",
    name: "sale_price_qty" /// foregn key
  })
  salePriceQty: number;

  @Column("int", {
    nullable: false,
    name: "license_id" /// foregn key
  })
  licenseId: number;

  @Column("int", {
    nullable: false,
    name: "custom_group_id" /// foregn key
  })
  customGroupId: number;

  @Column("int", {
    nullable: true,
    name: "national_dbk" /// foregn key
  })
  nationalDbk: number;

  @Column("int", {
    nullable: true,
    name: "rosl_group" /// foregn key
  })
  roslGroup: number;

  @Column({
    type: 'enum',
    enum : SubContractStatus,
    nullable: false,
    name: 'is_sub_contract',
    default:SubContractStatus.YES
  })
  isSubContract : SubContractStatus;

  @Column({
    type: "decimal", precision: 10, scale: 3,
    nullable: false,
    name: "sale_price"
  })
  salePrice: number;

  @Column({
    nullable: false,
    name: "order_confirmed_date"
  })
  orderConfirmedDate: Date;

  @Column({
    nullable: false,
    name: "first_ex_factory_date"
  })
  firstExFactoryDate: Date;

  @Column({
    nullable: false,
    name: "order_close_date"
  })
  orderCloseDate: Date;

  @Column("int", {
    nullable: true,
    default:'0',
    name: "moq" /// foregn key
  })
  moq: number;

  @Column("int", {
    nullable: false,
    name: "order_qty" /// foregn key
  })
  orderQty: number;

  @Column("int", {
    nullable: true,
    name: "facility_id" /// foregn key
  })
  facilityId: number;

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
    nullable: false,
    name: "created_user",
    length: 50
  })
  createdUser: string | null;


  @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length: 50
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag"
  })
  versionFlag: number;

  
  @OneToMany(type=>StyleOrder, item=>item.fgitemInfo,{cascade: true})
  styleOrderInfo:StyleOrder;

  
  @OneToMany(type=>ItemSkus, item=>item.fgitemInfo,{cascade: true})
  itemSkuInfo:ItemSkus;

}
