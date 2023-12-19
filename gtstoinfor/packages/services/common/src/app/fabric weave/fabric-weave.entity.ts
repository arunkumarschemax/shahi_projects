import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { FabricType } from '../fabric-types/fabric-type.entity';

@Entity('fabric_weave')
export class FabricWeave {
  
  @PrimaryGeneratedColumn("increment",{
    name:'fabric_weave_id'
  })
  fabricWeaveId:number;

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"fabric_weave_name"
    })
    fabricWeaveName:string;

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"fabric_weave_code"
    })
    fabricWeaveCode:string;

  @Column('varchar', {
        name: 'fabric_weave_image_name',
        nullable: false
    })
    fabricWeaveImageName: string;
  
    @Column('varchar', {
      name: 'fabric_weave_image_path',
      nullable: false
  })
  fabricWeaveImagePath: string;

  @Column('int',{
    nullable: false,
    name:"fabric_type_id"
    })
    fabricTypeId:number;

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
  }
