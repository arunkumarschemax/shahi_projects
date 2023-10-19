import {
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  JoinColumn,
} from "typeorm";
import { ScanEntity } from "./typeo-entity";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StatusEnum } from "../../../../../../libs/shared-models/src/common/enum/status.enum";

@Entity("invoice_items")
export class HSNEntity {
  @PrimaryGeneratedColumn("increment", {
    name: "hsn_id",
  })
  HsnId: number;

  @Column("varchar", {
    length: 50,
    name: "hsn_code",
  })
  HSN: string;

  @Column("varchar", {
    length: 50,
    name: "tax_type",
  })
  taxType: string;

  @Column("varchar", {
    length: 50,
    name: "tax_amount",
  })
  taxAmount: string;

  @Column("varchar", {
    length: 50,
    name: "tax_percentage",
  })
  taxPercentage: string;

  @Column("varchar", {
    length: 50,
    name: "description",
  })
  description: string;

  @Column("varchar", {
    length: 50,
    name: "charge",
  })
  charge: string;

  @Column("varchar", {
    length: 50,
    name: "unit_price",
  })
  unitPrice:string;

  @Column("varchar", {
    nullable:false,
    length: 50,
    name: "unit_quantity",
  })
  unitQuantity: string;

  // @Column("varchar", {
  //   length: 50,
  //   name: "unit_price",
  // })
  // UnitPrice: string;

  @Column("varchar", {
    length: 50,
    name: "quotation",
    nullable:true
  })
  quotation: string;

  @Column("varchar", {
    length: 50,
    name: "variance",
    default:""
  })
  variance: string;


  // @Column("varchar", {
  //   length: 50,
  //   name: "status",
  //   default:""
  // })
  // status: string;

  // @Column("enum", {
  //   default:StatusEnum.No_Variance,
  //   name: "variance_status",
  //   enum: StatusEnum,
  // })
  // VarianceStatus: StatusEnum;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;

  @Column("varchar", {
    length: 40,
    name: "created_user",
  })
  createdUser: string;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length: 50
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag",
  })
  versionFlag: number;

  @ManyToOne((type) => ScanEntity, (HSN) => HSN.scanentity, { nullable: false })
  @JoinColumn({ name: "id" })
  data: ScanEntity;
}
