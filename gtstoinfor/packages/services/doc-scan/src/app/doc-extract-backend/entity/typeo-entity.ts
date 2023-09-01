import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
    name: 'Gst',
  })
  Gst: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Ifsc',
  })
  Ifsc: string;

  // @Column('varchar', {
  //   nullable: false,
  //   length: 50,
  //   name: 'po_type',
  // })
  // PoType: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Innvoice',
  })
  Innvoice: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Customer',
  })
  Customer: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Packages',
  })
  Packages: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Volume',
  })
  Volume: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Weight',
  })
  Weight: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Chargeable',
  })
  Chargeable: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Date',
  })
  Date: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Cartons',
  })
  Cartons: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Console',
  })
  Console: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'PO',
  })
  PO: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Payref',
  })
  Payref: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Quantity',
  })
  Quantity: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'InnvoiceNumber',
  })
  InnvoiceNumber: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Currency',
  })
  Currency: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Origin',
  })
  Origin: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'Destination',
  })
  Destination: string;


  versionFlag: number;
  isActive: boolean;
}
