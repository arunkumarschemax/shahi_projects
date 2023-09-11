import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Innvoice')
export class ScanEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  typeId: number;

  @Column("varchar", {
    name: "file_name"
  })
  fileName: string;

  @Column("varchar", {
    name: "file_path"
  })
  filePath: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Gst',
  })
  GST: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'vendor',
  })
  Vendor: string;



  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'invoice_date',
  })
  invoiceDate: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'innvoice_number',
  })
  InnvoiceNumber: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'CGst',
  })
  Cgst: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'IGst',
  })
  IGST: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'SGst',
  })
  Sgst: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'innvoice_amount',
  })
  InnvoiceAmount: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'innvoice_currency',
  })
  InnvoiceCurrency: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'routing',
  })
  Routing: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'comment',
  })
  Comment: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'financial_year',
  })
  Financialyear: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'time_created',
  })
  Timecreated: string;

}