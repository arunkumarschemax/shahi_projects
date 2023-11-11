import {Column, Entity, PrimaryGeneratedColumn, VersionColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Countries } from "../countries/countries.entity";

@Entity('buying_house')
export class BuyingHouse {
  
  
  @PrimaryGeneratedColumn("increment",{
    name:'buying_house_id'
  })
  buyingHouseId:number;

  @Column("varchar",{
    nullable: true,
    length:100,
    name:"buying_house"
  })
  buyingHouse:string;

  @Column("varchar",{
    nullable: true,
    length:100,
    name:"contact_person"
  })
  contactPerson:string;

  @Column("varchar",{
    nullable: true,
    length:100,
    name:"email"
  })
  email:string;

  @Column("varchar",{
    nullable: true,
    length:20,
    name:"contact"
  })
  contact:string;

  @Column("text", {
    nullable: true,
    name: "address"
  })
  address: string;

  @Column("varchar",{
    nullable: true,
    length:50,
    name:"city"
  })
  city:string;

  // @Column("int",{
  //   nullable: false,
  //   name:"country_id"
  // })
  // countryId:number;

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

  @ManyToOne(() =>Countries,country =>country.buyingHouse)
  @JoinColumn({name:'country_id'})
  country:Countries

}