import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Vendors } from "../vendors/vendors.entity";
import { Buyers } from "../buyers/buyers.entity";
import { Address } from "../buyers/address.entity";
import { type } from "os";
import { BuyingHouse } from "../buying-house/buying-house.entity";

@Entity('countries')
export class Countries {

  @PrimaryGeneratedColumn("increment",{name:'country_id'})
  countryId:number;

  @Column("char",{
      nullable:false,
      length:50,
      name:"country_name"
      })
  // @Index({ unique: true })
  countryName:string;

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
      default:1,
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

  @OneToMany(type => Address, address => address.countryInfo)
  addressInfo: Buyers[];
  
  @OneToMany(type=>Vendors, vendor=>vendor.countryInfo,{cascade: true})
  vendorInfo:Vendors[];

  @OneToMany(type => BuyingHouse, buyingHouse => buyingHouse.country,{cascade : true})
  buyingHouse : BuyingHouse[]

}
