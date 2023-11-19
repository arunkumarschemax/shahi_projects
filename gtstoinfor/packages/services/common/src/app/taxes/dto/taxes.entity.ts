import { TaxCategoriesEnum, TaxtypeEnum } from '@project-management-system/shared-models';
import {Column,Entity,Index,PrimaryGeneratedColumn,VersionColumn,UpdateDateColumn,CreateDateColumn} from 'typeorm';

@Entity('taxes')
export class Taxes {
  @PrimaryGeneratedColumn('increment', { name: 'tax_id' })
  taxId: number;

  @Column('varchar', {
    nullable: false,
    length: 20,
    name: 'tax_name',
  })
  @Index({ unique: true })
  taxName: string;

  @Column('decimal', {
    nullable: false,
    name: 'tax_percentage',
    precision: 5,
    scale: 2,
  })
  taxPercentage: number;
  @Column({
    type: 'enum',
    nullable: false,
    enum: TaxtypeEnum,
    name: "tax_category"
  })
  taxcategory: TaxtypeEnum;

  @Column('boolean', {
    nullable: false,
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @Column('varchar', {
    nullable: false,
    name: 'created_user',
    length: 50,
  })
  createdUser: string | null;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;

  @Column('varchar', {
    nullable: true,
    name: 'updated_user',
    length: 50,
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: 'version_flag',
  })
  versionFlag: number;

}
