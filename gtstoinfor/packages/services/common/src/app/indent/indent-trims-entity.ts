import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { Indent } from "./indent-entity";
import { Col } from "antd";

@Entity('indent_trims')
export class IndentTrimsEntity {

  @PrimaryGeneratedColumn("increment", { name: 'itrims_id' })
  itrimsId: number;

  @Column("varchar", {
    nullable: false,
    name: "trim_type"
  })
  trimType: string;

  @Column('int',{
    name:'trim_code',
    nullable: false
    })
    trimCode: number;


    // @Column('int',{
    //     name:'color',
    //     nullable: false
    //     })
    //     color: number;
        @Column('decimal', {
          name: 'quantity',
        })
        quantity: number
    @Column('int',{
        name:'quantity_unit',
        nullable: false,
        })
        quantityUnit: number;
   
// @Column("varchar", {
//     nullable: false,
//     length: 255,
//     name: "m3_trim_code"
//     })
//     m3TrimCode: string;
//     @Column("varchar", {
//         nullable: true,
//         length: 255,
//         name: "description"
//       })
//       description: string;
      @Column("varchar", {
        nullable: true,
        length: 255,
        name: "remarks"
      })
      remarks: string;
    
      @Column("varchar", {
        nullable: true,
        length: 255,
        name: "file_path"
        })
        filePath: string;
  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;
  @Column("boolean", {
    nullable: false,
    default: false,
    name: "is_uploaded"
  })
  isUploaded: boolean;

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

  @Column('decimal', {
    name: 'received_quantity',
    default: 0,
  })
  recivedQuantity:number

  @ManyToOne(type => Indent, i => i.iTrimsInfo, { nullable: false, })
  @JoinColumn({ name: "indent_id" })
  indentInfo: Indent;

}
