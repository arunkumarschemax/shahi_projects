import { ItemTypeEnum, LogoEnum, PartEnum, RackEnum, TypeEnum, m3ItemsContentEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "../buyers/buyers.entity";
import { trimEntity } from "../Trim Masters/trim/trim-entity";
import { CategoryEntity } from "../Trim Masters/category/dto/category-entity";
import { SampleRequestItemsEntity } from "../sample-dev-request/entities/sample-request-items.entity";

@Entity('m3_items')
export class M3ItemsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'm3_items_Id' })
  m3ItemsId: number;

  @Column('enum',{
    name:'item_type',
    nullable: true,
    enum:ItemTypeEnum,
  })
  itemType: ItemTypeEnum;

  @Column('enum',{
    name:'type',
    nullable: true,
    default:TypeEnum.Local,
    enum:TypeEnum,
  })
  type: TypeEnum;

  @Column('varchar', {
    name: 'item_code',
    // default: () => "'FAB' || LPAD(nextval('item_code_seq')::text, 3, '0')",
    unique: true,
  })
  itemCode: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'description',
    unique: true,
  })
  description: string;


  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'content',
  })
  content: m3ItemsContentEnum;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'fabric_type',
  })
  fabricType: number;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'weave',
  })
  weave: number;

  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'weight',
  })
  weight: number;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'weight_unit',
  })
  weightUnit: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'construction',
  })
  construction: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'yarn_count',
  })
  yarnCount: string;

  
  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'yarn_unit',
  })
  yarnUnit: string;

  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'width',
  })
  width: number;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'width_unit',
  })
  widthUnit: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'finish',
  })
  finish: string;

  @Column('varchar', {
    nullable: true,
    length: 30,
    name: 'shrinkage',
  })
  shrinkage: string;

  @Column("int", {
    nullable: false,
    name: "buyer_id"
  })
  buyerId: number;

  // Trim columns 

  // @Column("int", {
  //   nullable: true,
  //   name: "category_id"
  // })
  // categoryId: number;

  @Column("int", {
    nullable: true,
    name: "color_id"
  })
  colorId: number;

  @Column("int", {
    nullable: true,
    name: "content_id"
  })
  contentId: number;

  @Column("int", {
    nullable: true,
    name: "finish_id"
  })
  finishId: number;

  @Column("int", {
    nullable: true,
    name: "hole_id"
  })
  holeId: number;

  @Column('enum',{
    name:'logo',
    nullable: true,
    enum:LogoEnum,
    // default:LogoEnum.PLAIN
  })
  logo: LogoEnum;

  @Column('enum',{
    name:'part',
    nullable: true,
    enum:PartEnum,
    // default:PartEnum["2_part"]
  })
  part: PartEnum;

  @Column("int", {
    nullable: true,
    name: "quality_id"
  })
  qualityId: number;

  @Column("int", {
    nullable: true,
    name: "structure_id"
  })
  structureId: number;

  @Column("int", {
    nullable: true,
    name: "thickness_id"
  })
  thicknessId: number;
  @Column("int", {
    nullable: true,
    name: "type_id"
  })
  typeId: number;

  @Column("int", {
    nullable: true,
    name: "uom_id"
  })
  uomId: number;
  @Column("int", {
    nullable: true,
    name: "variety_id"
  })
  varietyId: number;

  @Column("int", {
    nullable: true,
    name: "trim_category_id"
  })
  trimCategoryId: number;

  @Column("int", {
    nullable: true,
    name: "trim_mapping_id"
  })
  trimMappingId: number;
  // common columns 
  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;

  @Column("varchar", {
    nullable: true,
    name: "created_user"
  })
  createdUser: string | null;

  @Column("varchar", {
    nullable: true,
    name: "updated_user"
  })
  updatedUser: string | null;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: string;

  @VersionColumn({
    default: 1,
    name: 'version_flag'
  })
  versionFlag: number;

  @ManyToOne(type=>Buyers, m3Items=>m3Items.M3ItemCodes,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;

  @ManyToOne(type=>trimEntity,  m3Items=>m3Items.trimInfo,{  nullable:false, })
  @JoinColumn({ name:"trim_id"})
  trimId: trimEntity;


  @ManyToOne(type=>CategoryEntity,  m3Items=>m3Items.categoryInfo,{  nullable:false, })
  @JoinColumn({ name:"category_id"})
  categoryId: CategoryEntity;

  @OneToMany(type => SampleRequestItemsEntity, sampleReqItems => sampleReqItems.sampleRequestInfo, { cascade: true })
  m3ItemsInfo: SampleRequestItemsEntity[]

}