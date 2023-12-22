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
    nullable: true,
    length: 50,
    name: 'gst',
  })
  gstNumber: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'vendor_name',
  })
  venName: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'vendor_code',
  })
  venCod: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'invoice_date',
  })
  invoiceDate: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'invoice_number',
  })
  invoiceNumber: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'cgst',
  })
  cgst: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'igst',
  })
  igst: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'sgst',
  })
  sgst: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'invoice_amount',
  })
  invoiceAmount: string;

  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'invoice_currency',
  })
  invoiceCurrency: string;


  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'financial_year',
  })
  financialYear: string;

  
  @Column('varchar', {
    nullable: true,
    length: 50,
    name: 'status',
  })
  status: string;
  
  // @Column("enum", {
  //   name: "variance_status",
  //   enum: StatusEnum,
  // })
  // VarianceStatus: StatusEnum;

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