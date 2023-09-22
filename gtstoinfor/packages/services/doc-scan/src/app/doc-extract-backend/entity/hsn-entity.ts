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
  Taxtype: string;

  @Column("varchar", {
    length: 50,
    name: "tax_amount",
  })
  Taxamount: string;

  @Column("varchar", {
    length: 50,
    name: "tax_percentage",
  })
  Taxpercentage: string;

  @Column("varchar", {
    length: 50,
    name: "charge",
  })
  Charge: string;

  @Column("varchar", {
    nullable:true,
    length: 50,
    name: "unit_quantity",
  })
  unitquantity: string;

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

  @Column("enum", {
    default:StatusEnum.No_Variance,
    name: "variance_status",
    enum: StatusEnum,
  })
  VarianceStatus: StatusEnum;

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