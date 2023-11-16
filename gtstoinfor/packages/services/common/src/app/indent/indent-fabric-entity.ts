import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ItemCategory } from "../item-categories/item-categories.entity";
import { ItemSubCategory } from "../item-sub-categories/item-sub-category.entity";
import { OperationSequence } from "../operation-sequence/operation-sequence.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { StyleOrder } from "../style-order/style-order.entity";
import { Indent } from "./indent-entity";

@Entity('indent_fabric')
export class IndentFabricEntity {

  @PrimaryGeneratedColumn("increment", { name: 'ifabric_id' })
  ifabricId: number;

  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "content"
  })
  content: string;

  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "fabric_type"
  })
  fabricType: string;

  @Column('int',{
    name:'weave_id',
    nullable: false
    })
    weaveId: number;

@Column('int',{
    name:'weight',
    nullable: false
    })
    weight: number;
  
    @Column('int',{
      name:'weight_unit',
      nullable: false
      })
      weightUnit: number;

    @Column('int',{
        name:'width',
        nullable: false
        })
        width: number;
    @Column('int',{
        name:'yarn_count',
        nullable: false
        })
        yarnCount: number;
        @Column('int',{
          name:'yarn_unit',
          nullable: false
          })
          yarnUnit: number;
@Column("varchar", {
    nullable: false,
    length: 255,
    name: "construction"
    })
    construction: string;
    @Column("varchar", {
        nullable: false,
        length: 255,
        name: "finish"
      })
      finish: string;
      @Column("varchar", {
        nullable: false,
        length: 255,
        name: "shrinkage"
      })
      shrinkage: string;
    @Column("varchar", {
    nullable: false,
    length: 255,
    name: "m3_fabric_code"
    })
    m3FabricCode: string;
    @Column('int',{
        name:'color',
        nullable: false
        })
        color: number;
        @Column('int',{
            name:'pch',
            nullable: false
            })
            pch: number;
            @Column('int',{
                name:'moq',
                nullable: false
                })
                moq: number;
                @Column('int',{
                    name:'moq_unit',
                    nullable: false
                    })
                    moqUnit: number;
                    @Column('int',{
                        name:'moq_price',
                        nullable: false
                        })
                        moqPrice: number;

                        @Column('int',{
                            name:'moq_price_unit',
                            nullable: false
                            })
                            moqPriceUnit: number;
    
                    @Column("varchar", {
                        nullable: false,
                        length: 255,
                        name: "season"
                        })
                        season: string;
                        @Column('int',{
                            name:'supplier_id',
                            nullable: true
                            })
                            supplierId: number;
                            @Column('int',{
                                name:'buyer_id',
                                nullable: true
                                })
                                buyerId: number;
  @Column('datetime',{
    name:'grn_date',
    nullable: false
  })
  grnDate: Date;
  @Column("varchar", {
    nullable: false,
    length: 255,
    name: "xl_no"
    })
    xlNo: string;

    @Column('varchar',{
        name:'quantity',
        nullable: false
        })
        quantity: string;

        @Column('int',{
          name:'quantity_unit',
          nullable: false
          })
          quantityUnit: number;
    @Column("varchar", {
        nullable: true,
        length: 255,
        name: "file_path"
        })
        file_path: string;
        @Column("boolean", {
            nullable: false,
            default: false,
            name: "is_uploaded"
          })
          isUploaded: boolean;

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

  @Column('varchar',{
    name:'received_quantity',
    nullable:true
  })
  recivedQuantity:string

  @ManyToOne(type => Indent, i => i.iFabricInfo, { nullable: false, })
  @JoinColumn({ name: "indent_id" })
  indentInfo: Indent;

}
