import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Countries } from "../countries/countries.entity";
import { BuyerGeneralAttributesEntity } from "./buyers-general.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
// import { PaymentMode } from "../payment-mode/payment-mode.entity";
// import { ShippingTerms } from "../shipping-terms/shipping-terms.entity";

@Entity('buyers')
export class Buyers {

  @PrimaryGeneratedColumn("increment",{name:'buyer_id'})
  buyerId:number;

  @Column("varchar",{
    nullable:false,
    length:15,
    name:"client_code"
  })
  clientCode:string;

  @Column("varchar",{
    nullable:false,
    length:50,
    name:"client_name"
  })
  @Index({unique:true})
  clientName:string;

  // @Column("varchar",{
  //   nullable:false,
  //   length:50,
  //   name:"account_type"
  // })
  // accountType:string;
    
  @Column("varchar",{
    nullable:true,
    length:20,
    name:"gst_number"
  })
  gstNumber:string;

  @Column("varchar",{
    nullable:true,
    length:50,
    name:"contact_person"
  })
  contactPerson:string;

  @Column("varchar",{
    nullable:false,
    length:10,
    name:"phone_no"
  })
  phoneNo:string;

  @Column("varchar",{
      nullable:true,
      length:30,
      name:"email"
  })
  email:string;

  @Column("varchar",{
      nullable:false,
      length:15,
      name:"currency"
  })
  currency:string;

  // @Column("varchar",{
  //     nullable:false,
  //     length:50,
  //     name:"payment_terms"
  // })
  // paymentTerms:string;

  // @Column("varchar",{
  //     nullable:false,
  //     length:50,
  //     name:"shipment_terms"
  // })
  // shipmentTerms:string;

  // @Column("int",{
  //    nullable:false,
  //    name:"payment_mode_id"
  // })
  // paymentModeId:number;

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

  @Column("varchar",{
      nullable:true,
      length:50,
      name:"public_note"
  })
  publicNote:string;

  @Column("varchar",{
      nullable:true,
      length:50,
      name:"privateNote"
  })
  privateNote:string;

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

  @ManyToOne(type=>PaymentMethod, paymentMethod=>paymentMethod.buyerInfo,{  nullable:false, })
  @JoinColumn({ name:"payment_method_id"})
  paymentMethodInfo: PaymentMethod;

  @ManyToOne(type=>PaymentTerms, paymentTerms=>paymentTerms.buyerInfo,{  nullable:false, })
  @JoinColumn({ name:"payment_terms_id"})
  paymentTermsInfo: PaymentTerms;

//   @ManyToOne(type=>ShippingTerms, shippingTerms=>shippingTerms.shippingTermsId,{  nullable:false, })
//     @JoinColumn({ name:"shipment_terms"})
//     shippingTermsInfo: ShippingTerms;


    @ManyToOne(type=>Countries, country=>country.buyersInfo,{  nullable:false, })
    @JoinColumn({ name:"country_id"})
    countryInfo: Countries;

    @OneToMany(type => BuyerGeneralAttributesEntity, attribute => attribute.buyerInfo,{cascade: true})
    generalAttributesInfo : BuyerGeneralAttributesEntity

}
