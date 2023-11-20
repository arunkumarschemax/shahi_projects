import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
// import { Countries } from "../countries/countries.entity";
import { Currencies } from "../currencies/currencies.entity";
import { Countries } from "../countries/countries.entity";
// import { VendorsPriceList } from "../vendors-price-list/entities/vendor-price-list.entity";

@Entity('vendors')
export class Vendors {

  @PrimaryGeneratedColumn("increment",{name:'vendor_id'})
  vendorId:number;

  @Column("char",{
      nullable:false,
      length:50,
      name:"vendor_code"
      })
  @Index({unique:false})
  vendorCode:string;

  @Column("varchar",{
      nullable:false,
      length:50,
      name:"vendor_name"
      })
  vendorName:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"gst_number"
    })
  gstNumber:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"website"
    })
  website:string;
  
@Column("varchar",{
    nullable:false,
    length:50,
    name:"contact_person"
    })
contactPerson:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"street"
    })
street:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"apartment"
    })
apartment:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"city"
    })
city:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"postal_code"
    })
postalCode:string;

@Column("varchar",{
    nullable:true,
    length:50,
    name:"private_note"
    })
privateNote:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"public_note"
    })
publicNote:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"bank_acc_no"
    })
bankAccNo:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"bank_ifsc"
    })
bankIfsc:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"bank_name"
    })
bankName:string;
@Column("varchar",{
    nullable:true,
    length:50,
    name:"bank_branch"
    })
bankBranch:string;
@Column("varchar",{
    nullable: true,
    length:50,
    name:"contact_number"
    })
contactNumber:string;
@Column("varchar",{
    nullable: true,
    length:50,
    name:"email_id"
    })
emailId:string;
  @Column("boolean",{
    nullable:false,
    default:true,
    name:"is_active"
    })
    isActive:boolean;

    // @Column({
    //     type: 'enum',
    //     enum : GlobalStatus,
    //     nullable: true,
    //     name: 'candidate_type',
    //     default:GlobalStatus.NO
    // })
    // priceNeeded : GlobalStatus;
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


//   @OneToMany(type => VendorsPriceList, venPrcList => venPrcList.vendors)
//   vendorsPriceList: VendorsPriceList[];

  @ManyToOne(type=>Currencies, currency=>currency.vendorInfo,{  nullable:false, })
  @JoinColumn({ name:"currency_id"})
  currencyInfo: Currencies;

  @ManyToOne(type=>Countries, country=>country.vendorInfo,{  nullable:false, })
  @JoinColumn({ name:"country_id"})
  countryInfo: Countries;
}
