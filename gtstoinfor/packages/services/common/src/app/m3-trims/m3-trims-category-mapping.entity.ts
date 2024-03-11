import { ItemTypeEnum, LogoEnum, PartEnum, RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "../buyers/buyers.entity";

@Entity('category_mapping')
export class CategoryMappingEntity {

  @PrimaryGeneratedColumn("increment", { name: 'category_mapping_id' })
  categoryMappingId: number;

  @Column('int',{
    name:'trim_category',
    nullable:false,
  })
  trimCategory:number

    @Column('int',{
        name:'category_id',
        nullable:true,
    })
    categoryId:number
    @Column('int',{
        name:'hole_id',
        nullable:true,
    })
    holeId:number
    @Column('int',{
        name:'color_id',
        nullable:true,
    })
    colorId:number
    @Column('int',{
        name:'content_id',
        nullable:true,
    })
    contentId:number
    @Column('int',{
        name:'finish_id',
        nullable:true,
    })
    finishId:number

    @Column('int',{
        name:'logo_id',
        nullable:true,
    })
    logoId:number
    @Column('int',{
        name:'part_id',
        nullable:true,
    })
    partId:number

    @Column('int',{
        name:'quality_id',
        nullable:true,
    })
    qualityId:number

    @Column('int',{
        name:'structure_id',
        nullable:true,
    })
    structureId:number
    @Column('int',{
        name:'thickness_id',
        nullable:true,
    })
    thicknessId:number

    @Column('int',{
        name:'type_id',
        nullable:true,
    })
    typeId:number
    @Column('int',{
        name:'uom_id',
        nullable:true,
    })
    uomId:number
    @Column('int',{
        name:'variety_id',
        nullable:true,
    })
    varietyId:number

    @Column('int',{
        name:'parts_id',
        nullable:true,
    })
    partsId:number
    @Column('int',{
        name:'length_id',
        nullable:true,
    })
    lengthId:number
    @Column('int',{
        name:'shape_id',
        nullable:true,
    })
    shapeId:number
    @Column('int',{
        name:'line_id',
        nullable:true,
    })
    lineId:number
    @Column('int',{
        name:'size_id',
        nullable:true,
    })
    sizeId:number
    @Column('int',{
        name:'buyer_id',
        nullable:true,
    })
    buyerId:number
    @Column('int',{
        name:'slider_id',
        nullable:true,
    })
    sliderId:number
    @Column('int',{
        name:'ply_id',
        nullable:true,
    })
    plyId:number

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

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'm3_code',
  })
  m3Code: string;

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'hsn_code',
  })
  hsnCode: string;
  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'file_name',
  })
  fileName: string;

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'file_path',
  })
  filePath: string;
  @ManyToOne(type=>Buyers, m3Trims=>m3Trims.M3TrimCodes,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;

}