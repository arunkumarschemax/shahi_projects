import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { ComponentMappingEntity } from '../components-mapping/component-mapping.entity';

@Entity('components')
export class Components {
  
  @PrimaryGeneratedColumn("increment",{
    name:'component_id'
  })
  componentId:number;

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"component_name"
    })
  componentName:string;

  @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
    })
  isActive:boolean;

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

  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
      nullable: true,
      name: "updated_user"
  })
  updatedUser: string | null;
  
  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  @OneToMany(type=>ComponentMappingEntity, e=>e.componentInfo,{cascade: true})
  componentMappingInfo:ComponentMappingEntity[];

  }