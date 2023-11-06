import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { FeatureEntity } from './feature.entity';
import { OptionEnum } from '@project-management-system/shared-models';

@Entity('feature_option')
export class FeatureOptionEntity {
  
  @PrimaryGeneratedColumn("increment",{
    name:'feature_option_id'
  })
  featureOptionId:number;

  @Column("enum",{
    name: 'option_group',
    nullable: false,
    enum : OptionEnum
  })
  option:OptionEnum;

  @Column('int',{
    name:'option_id',
    nullable:false,
  })
  optionId:number

  @Column('varchar',{
    name:'option_value',
    nullable:false,
  })
  optionValue:string

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"feature_code"
  })
  featureCode:string;

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

  @ManyToOne(()=>FeatureEntity, feature => feature.fChild,{nullable:false})
  @JoinColumn({name : "feature_id"})
  feature : FeatureEntity
  }
