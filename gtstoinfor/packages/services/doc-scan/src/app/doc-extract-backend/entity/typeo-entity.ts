import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('typeo')
export class TypeoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'type_id',
  })
  typeId: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'GST',
  })
  GST: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
    name: 'IFSC',
  })
  IFSC: string;

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

  versionFlag: number;
  isActive: boolean;
}
