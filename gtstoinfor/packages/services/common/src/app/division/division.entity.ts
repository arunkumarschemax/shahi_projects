import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from "../settings/settings.entity";

@Entity('division')
export class Division {

  @PrimaryGeneratedColumn("increment",{name:'division_id'})
  divisionId:number;

  @Column("varchar",{
      nullable:false,
      length:50,
      name:"division_name"
      })
  // @Index({ unique: true })
  divisionName:string;

  @Column("varchar",{
    nullable:false,
    length:50,
    name:"division_code"
    })
// @Index({ unique: true })
divisionCode:string;
@Column("int",{
    nullable:false,
  
    name:"company_id"
    })
// @Index({ unique: true })
companyId:number;

// @Index({ unique: true })
organizationCode:string;

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
    nullable: false,
    name: "created_user",
    length:50
})
createdUser: string | null;


  @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length:50
})
updatedUser: string | null;


  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];

  // @OneToMany(type=>Vendors, vendor=>vendor.currencyInfo,{cascade: true})
  // vendorInfo:Vendors[];

  @OneToMany(type => Settings, settings => settings.divisionInfo,{cascade: true})
  settingsInfo : Settings

}