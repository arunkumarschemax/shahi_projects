import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from '../settings/settings.entity';
// import { Customers } from '../customers/customers.entity';

@Entity('delivery_method')
export class DeliveryMethod {
  
  @PrimaryGeneratedColumn("increment",{
    name:'delivery_method_id'
  })
  deliveryMethodId:number;

  @Column("varchar",{
    nullable: true,
    length:15,
    name:"delivery_method"
    })
  // @Index({unique:true})
  deliveryMethod:string;

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
  // @OneToMany(type=>Customers, customers=>customers.paymentModeId,{cascade: true})
  // customerInfo:Customers[];

  // @OneToMany(type=>PaymentMode, PaymentMode=>PaymentMode.paymentModeId,{cascade: true})
  // PaymentModeInfo:PaymentMode[];

  @OneToMany(type => Settings, settings => settings.deliveryMethodInfo,{cascade: true})
  settingsInfo : Settings
  }
