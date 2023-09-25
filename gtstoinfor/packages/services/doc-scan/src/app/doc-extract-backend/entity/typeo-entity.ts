import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { HSNEntity } from './hsn-entity';
import { StatusEnum } from '@xpparel/shared-models';
@Entity('invoice')
export class ScanEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  typeId: number;

  // @Column("varchar", {
  //   name: "file_name"
  // })
  // fileName: string;

  // @Column("varchar", {
  //   name: "file_path"
  // })
  // filePath: string;

  @Column('varchar', {
    length: 50,
    name: 'gst',
  })
  GST: string;

  @Column('varchar', {
    length: 50,
    name: 'vendor',
  })
  Vendor: string;



  @Column('varchar', {
    length: 50,
    name: 'invoice_date',
  })
  invoiceDate: string;

  @Column('varchar', {
    length: 50,
    name: 'innvoice_number',
  })
  InnvoiceNumber: string;

  @Column('varchar', {
    length: 50,
    name: 'cgst',
  })
  Cgst: string;

  @Column('varchar', {
    length: 50,
    name: 'igst',
  })
  IGST: string;

  @Column('varchar', {
    length: 50,
    name: 'sgst',
  })
  Sgst: string;

  @Column('varchar', {
    length: 50,
    name: 'innvoice_amount',
  })
  InnvoiceAmount: string;

  @Column('varchar', {
    length: 50,
    name: 'innvoice_currency',
  })
  InnvoiceCurrency: string;

  @Column('varchar', {
    length: 50,
    name: 'routing',
  })
  Routing: string;

  @Column('varchar', {
    length: 50,
    name: 'comment',
  })
  Comment: string;

  @Column('varchar', {
    length: 50,
    name: 'financial_year',
  })
  Financialyear: string;

  @Column('varchar', {
    length: 50,
    name: 'time_created',
  })
  Timecreated: string;

  @Column('varchar', {
    length: 50,
    name: 'buyer_name',
  })
  buyerName: string;

  @Column("enum", {
    name: "variance_status",
    enum: StatusEnum,
  })
  VarianceStatus: StatusEnum;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime"
  })
  createdAt: Date;

  @Column("varchar", {

    name: "created_user",
    length: 50
  })
  createdUser: string;


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

    name: "version_flag",
    default: 1
  })
  versionFlag: number;

  @OneToMany(() => HSNEntity, SCAN => SCAN.data, { cascade: true })
  scanentity: HSNEntity[]

}