import { BaseEntity, Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
@Entity('Innvoice')
export class ScanEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'type_id',
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
    name: 'GST',
  })
  GST: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Vendor',
  })
  Vendor: string;

  

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'invoiceDate',
  })
  invoiceDate: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'InnvoiceNumber',
  })
  InnvoiceNumber: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Cgst',
  })
  Cgst: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'IGST',
  })
  IGST: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Sgst',
  })
  Sgst: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'InnvoiceAmount',
  })
  InnvoiceAmount: string;


  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'InnvoiceCurrency',
  })
  InnvoiceCurrency: string;

}