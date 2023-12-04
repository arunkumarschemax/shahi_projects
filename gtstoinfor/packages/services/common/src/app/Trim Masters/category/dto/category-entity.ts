import { TaxCategoriesEnum } from '@project-management-system/shared-models';
import { CommonColumns } from 'packages/services/common/common-columns.entity';
import {Column,Entity,Index,PrimaryGeneratedColumn,VersionColumn,UpdateDateColumn,CreateDateColumn} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment', { name: 'category_id' })
  categoryId: number;

  @Column('varchar',{
    name:'category',
    nullable:false
  })
  category:string
  @Column('varchar',{
    name:'category_code',
    nullable:false
  })
  categoryCode:string
  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "created_user",
  })
  createdUser: string | null;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: string;

  @Column("varchar", {
    nullable: true,
    length: 40,
    name: "updated_user",
  })
  updatedUser: string | null;

  @VersionColumn({
    default: 1,
    name: "version_flag",
  })
  versionFlag: number;

  @Column({
    nullable: false,
    name: "is_active",
    default:1
  })
  isActive: boolean;
}