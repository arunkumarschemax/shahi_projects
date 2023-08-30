import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Buyers } from "./buyers.entity";
import { Countries } from "../countries/countries.entity";
import { Settings } from "../settings/settings.entity";


@Entity('address')
export class Address {

  @PrimaryGeneratedColumn("increment",{name:'address_id'})
  addressId:number;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"state"
  })
  state:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"district"
  })
  district:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"city"
  })
  city:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"landmark"
  })
  landmark:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"lane1"
  })
  lane1:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"lane2"
  })
  lane2:string;

  @Column("varchar",{
    nullable:true,
    length:10,
    name:"pincode"
  })
  pincode:string;

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
      default: "ADMIN",
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

  
  @ManyToOne(type=>Countries, country=>country.addressInfo,{  nullable:false, })
  @JoinColumn({ name:"country_id"})
  countryInfo: Countries;

  @ManyToOne(type=>Buyers, buyers=>buyers.adressInfo,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers[];

  @OneToMany(type => Settings, settings => settings.addressInfo,{cascade: true})
  settingsInfo : Settings



}
