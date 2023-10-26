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
    nullable: true,
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
    nullable: false,
    name: "brand_id" /// foregn key
  })
  brandId: number;
  @Column("int", {
    nullable: false,
    name: "category_id" /// foregn key
  })
  categoryId: number;

  @Column("int", {
    nullable: false,
    name: "sub_category_id" /// foregn key
  })
  subCategoryId: number;

  @Column("int", {
    nullable: false,
    name: "season_id" /// foregn key
  })
  seasonId: number;

  @Column("int", {
    nullable: false,
    name: "responsible_person_id" /// foregn key
  })
  responsiblePersonId: number;

  @Column("int", {
    nullable: false,
    name: "product_designer_id" /// foregn key
  })
  productDesignerId: number;

  @Column("int", {
    nullable: false,
    name: "approver" /// foregn key
  })
  approver: number;

  @Column("int", {
    nullable: false,
    name: "production_merchant" /// foregn key
  })
  productionMerchant: number;

  @Column("int", {
    nullable: false,
    name: "pd_merchant" /// foregn key
  })
  pdMerchant: number;

  @Column("int", {
    nullable: false,
    name: "factory_merchant" /// foregn key
  })
  factoryMerchant: number;

  @Column("int", {
    nullable: false,
    name: "sale_person_id" /// foregn key
  })
  salePersonId: number;

  @Column("varchar", {
    nullable: true,
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
  altUom: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "currency"
  })
  currency: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "item_group"
  })
  itemGroup: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "product_group"
  })
  productGroup: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "business_area"
  })
  businessArea: string;

  @Column("varchar", {
    nullable: true,
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

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "search_group"
  })
  searchGroup: string;
  
  @Column("int", {
    nullable: false,
    name: "conversion_factor_id" /// foregn key
  })
  conversionFactorId: number;

  @Column("int", {
    nullable: false,
    name: "reference_id" /// foregn key
  })
  referenceId: number;

  @Column("int", {
    nullable: false,
    name: "projection_order_id" /// foregn key
  })
  projectionOrderId: number;

  @Column("int", {
    nullable: false,
    name: "buying_house_commision" /// foregn key
  })
  buyingHouseCommision: number;

  @Column("int", {
    nullable: false,
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
    nullable: false,
    name: "national_dbk" /// foregn key
  })
  nationalDbk: number;
  @Column("int", {
    nullable: false,
    name: "rosl_group" /// foregn key
  })
  roslGroup: number;

  @Column({
    type: 'enum',
    enum : SubContractStatus,
    nullable: true,
    name: 'is_sub_contract',
    default:SubContractStatus.YES
  })
  isSubContract : SubContractStatus;

  @Column({
    type: "decimal", precision: 10, scale: 3,
    nullable: true,
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
    nullable: false,
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
    nullable: false,
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
