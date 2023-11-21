import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { FeatureOptionEntity } from './feature-option-entity';
import { OptionEnum } from '@project-management-system/shared-models';
import { FeatureSubstitution } from '../../substituion/feature-substituion.entity';

@Entity('feature')
export class FeatureEntity {
  
  @PrimaryGeneratedColumn("increment",{
    name:'feature_id'
  })
  featureId:number;

  @Column("varchar",{
    nullable: true,
    length:30,
    name:"feature_name"
  })
  featureName:string;

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"feature_code"
  })
  featureCode:string;
    
  @Column("varchar",{
    nullable: true,
    name:"description"
  })
  description:string;

  @Column("enum",{
    name: 'option_group',
    nullable: false,
    enum : OptionEnum
  })
  option:OptionEnum;

  @CreateDateColumn({
    name: "created_at",
    type:"datetime"
  })
  createdAt: Date;

  @Column("varchar", {
      nullable: true,
      name: "created_user"
  })
  createdUser: string | null;

  @OneToMany(()=>FeatureOptionEntity, fColor => fColor.feature, {cascade: true})
  fChild : FeatureOptionEntity[]

  @OneToMany(type=>FeatureSubstitution, item=>item.featureInfo,{cascade: true})
  featureSubstitutionInfo:FeatureSubstitution;
  
}
