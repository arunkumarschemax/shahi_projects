import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('typetwo')
export class TypetwoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'type_id',
  })
  typeId: number;

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
