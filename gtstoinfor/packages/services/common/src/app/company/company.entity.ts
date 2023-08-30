import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from "../settings/settings.entity";

@Entity('company')
export class Company {

  @PrimaryGeneratedColumn("increment",{name:'company_id'})
  companyId:number;

  @Column("varchar",{
      nullable:false,
      length:50,
      name:"company_name"
      })
  // @Index({ unique: true })
  companyName:string;

  @Column("varchar",{
    nullable:false,
    length:50,
    name:"company_code"
    })
// @Index({ unique: true })
companyCode:string;

@Column("char",{
    nullable:false,
    length:50,
    name:"organization_code"
    })
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

  @OneToMany(type => Settings, settings => settings.companyInfo,{cascade: true})
  settingsInfo : Settings

}
