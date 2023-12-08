import { ItemTypeEnum, LogoEnum, PartEnum, RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Buyers } from "../buyers/buyers.entity";

@Entity('m3_trims')
export class M3TrimsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'm3_trim_Id' })
  m3TrimId: number;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'trim_code',
  })
  trimCode: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'item_code',
  })
  itemCode: string;

  @Column('varchar', {
    nullable: false,
    length: 30,
    name: 'description',
  })
  description: string;

  
  @Column('enum',{
    name:'trim_type',
    nullable: true,
    enum:ItemTypeEnum,
  })
  trimType: ItemTypeEnum;

  @Column('enum',{
    name:'logo',
    nullable: true,
    enum:LogoEnum,
  })
  logo: LogoEnum;

  @Column('enum',{
    name:'part',
    nullable: true,
    enum:PartEnum,
  })
  part: PartEnum;


  @Column('int',{
      name:'trim_category_id',
      nullable:false,
    })
    trimCategoryId:number

    @Column('int',{
      name:'trim_mapping_id',
      nullable:false,
    })
    trimMappingId:number

    @Column('int',{
      name:'variety_id',
      nullable:false,
    })
    varietyId:number

    @Column('int',{
      name:'uom_id',
      nullable:false,
    })
    uomId:number

    @Column('int',{
      name:'type_id',
      nullable:false,
    })
    typeId:number

    @Column('int',{
      name:'thickness_id',
      nullable:false,
    })
    thicknessId:number

    @Column('int',{
      name:'structure_id',
      nullable:false,
    })
    structureId:number

    @Column('int',{
      name:'quality_id',
      nullable:false,
    })
    qualityId:number

    @Column('int',{
      name:'hole_id',
      nullable:false,
    })
    holeId:number

    @Column('int',{
      name:'finish_id',
      nullable:false,
    })
    finishId:number

    @Column('int',{
      name:'content_id',
      nullable:false,
    })
    contentId:number


    @Column('int',{
      name:'category_id',
      nullable:false,
    })
    categoryId:number


    @Column('int',{
      name:'color_id',
      nullable:false,
    })
    colorId:number


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

  @ManyToOne(type=>Buyers, m3Trims=>m3Trims.M3TrimCodes,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;

}