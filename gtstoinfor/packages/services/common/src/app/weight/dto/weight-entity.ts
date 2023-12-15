import { TaxCategoriesEnum } from '@project-management-system/shared-models';
import { CommonColumns } from 'packages/services/common/common-columns.entity';
import {Column,Entity,Index,PrimaryGeneratedColumn,VersionColumn,UpdateDateColumn,CreateDateColumn, OneToMany} from 'typeorm';

@Entity('weight')
export class WeightEntity {
  @PrimaryGeneratedColumn('increment', { name: 'weight_id' })
  weightId: number;

  @Column('varchar',{
    name:'weight',
    nullable:false
  })
  
  weight:string
  @CreateDateColumn({
    name: "created_at",
    nullable: false,

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
    nullable: false,

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
  