import { ItemTypeEnum, LogoEnum, MaterialFabricEnum, PartEnum, RackEnum } from "@project-management-system/shared-models";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('trim_request_code')
export class TrimRequestCodeEntity {

  @PrimaryGeneratedColumn("increment", { name: 'trim_request_code_id' })
  trimRequestCodeId: number;
  
  @Column('enum',{
    name:'trim_type',
    nullable: false,
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
      name:'buyer_id',
      nullable:false,
    })
    buyerId:number//

    @Column('int',{
      name:'variety_id',
      nullable:true,
    })
    varietyId:number

    @Column('int',{
      name:'uom_id',
      nullable:true,
    })
    uomId:number

    @Column('int',{
      name:'type_id',
      nullable:true,
    })
    typeId:number//

    @Column('int',{
      name:'thickness_id',
      nullable:true,
    })
    thicknessId:number

    @Column('int',{
      name:'structure_id',
      nullable:true,
    })
    structureId:number

    @Column('int',{
      name:'quality_id',
      nullable:true,
    })
    qualityId:number

    @Column('int',{
      name:'hole_id',
      nullable:true,
    })
    holeId:number//

    @Column('int',{
      name:'finish_id',
      nullable:true,
    })
    finishId:number//

    @Column('int',{
      name:'content_id',
      nullable:true,
    })
    contentId:number//


    @Column('int',{
      name:'category_id',
      nullable:true,
    })
    categoryId:number//


    @Column('int',{
      name:'color_id',
      nullable:true,
    })
    colorId:number

    @Column('enum',{
      name:'status',
      nullable: true,
      enum:MaterialFabricEnum,
    })
    status: MaterialFabricEnum;

    @Column('int', {
      nullable: true,
      name: 'm3_trim_id',
    })
    m3TrimId: number;


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
  m3Code: string;//

  @Column('varchar', {
    nullable: true,
    length: 155,
    name: 'hsn_code',
  })
  hsnCode: string;//

}