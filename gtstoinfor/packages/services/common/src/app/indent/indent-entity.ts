import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { IndentFabricEntity } from "./indent-fabric-entity";
import { IndentTrimsEntity } from "./indent-trims-entity";
import { SampleRequest } from "../sample-dev-request/entities/sample-dev-request.entity";
import { IndentItemsEntity } from "./indent-items.entity";

@Entity('indent')
export class Indent {

  @PrimaryGeneratedColumn("increment", { name: 'indent_id' })
  indentId: number;

  @Column('int',{
    name:'style',
    nullable: false
    })
    style: number;

    @Column('int',{
      name:'buyer_id',
      nullable: false
      })
      buyerId: number;

  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "request_no"
  })
  requestNo: string;

  @Column('datetime',{
    name:'indent_date',
    nullable: false
  })
  indentDate: Date;


  @Column('datetime',{
    name:'expected_date',
    nullable: false
  })
  expectedDate: Date;

  @Column('datetime',{
    name:'indent_close_date',
    nullable: true
  })
  indentCloseDate: Date;


  @Column("varchar", {
    nullable: true,
    length: 50,
    name: "remarks"
  })
  remarks: string;


  @Column('enum',{
    name:'status',
    nullable: false,
    enum:CustomerOrderStatusEnum,
    default:CustomerOrderStatusEnum.OPEN
  })
  status: CustomerOrderStatusEnum;
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

  @OneToMany(type => IndentItemsEntity, indentItem => indentItem.indentInfo, { cascade: true })
  indentItemInfo: IndentItemsEntity[];

  // @OneToMany(type => IndentFabricEntity, fabric => fabric.indentInfo, { cascade: true })
  // iFabricInfo: IndentFabricEntity[];

  // @OneToMany(type => IndentTrimsEntity, trim => trim.indentInfo, { cascade: true })
  // iTrimsInfo: IndentTrimsEntity[];

  // @ManyToOne(type =>SampleRequest,sampleReq =>sampleReq.indentInfo)
  // @JoinColumn({name:'sample_request_id'})
  // sampleReq:SampleRequest

}
