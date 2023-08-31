import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfitControlHead } from "../profit-control-head/profit-control-head-entity";
import { Company } from "../company/company.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Division } from "../division/division.entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { Currencies } from "../currencies/currencies.entity";
import { LiscenceType } from "../liscence-type/liscence-type.entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { Address } from "../buyers/address.entity";

@Entity('settings')
export class Settings {
    @PrimaryGeneratedColumn('increment',{
        name:'settings_id'
    })
    settingsId:number

    @Column('int',{
        name:'account_control_id'
    })
    accountControlId : number

    @Column('int',{
        name:'sales_person_id'
    })
    salesPersonId : number

    @Column('int',{
        name:'fabric_responsible_id'
    })
    fabricResponsibleId : number

    @Column('int',{
        name:'item_responsible_id'
    })
    itemResponsibleId : number

    @Column('int',{
        name:'trim_responsible_id'
    })
    trimResponsibleId : number

    @Column('varchar',{
        name:'buyer_group'
    })
    buyerGroup : string

    @Column('int',{
        name:'agent'
    })
    agent : number

    @Column('int',{
        name:'discount'
    })
    discount : number

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

    @ManyToOne(type => ProfitControlHead,pch => pch.settingsInfo,{nullable:true})
    @JoinColumn({name:'pch_id'})
    pchInfo: ProfitControlHead

    @ManyToOne(type => Company,com => com.settingsInfo,{nullable:true})
    @JoinColumn({name:'company_id'})
    companyInfo: Company

    @ManyToOne(type => FactoriesEntity,fac => fac.settingsInfo,{nullable:true})
    @JoinColumn({name:'factory_id'})
    factoryInfo: FactoriesEntity

    @ManyToOne(type => Division,div => div.settingsInfo,{nullable:true})
    @JoinColumn({name:'division_id'})
    divisionInfo: Division

    @ManyToOne(type => Warehouse,wh => wh.settingsInfo,{nullable:true})
    @JoinColumn({name:'warehouse_id'})
    wareHouseInfo: Warehouse

    @ManyToOne(type => Currencies,cur => cur.settingsInfo,{nullable:true})
    @JoinColumn({name:'currency_id'})
    currencyInfo: Currencies

    @ManyToOne(type => LiscenceType,lt => lt.settingsInfo,{nullable:true})
    @JoinColumn({name:'license_type_id'})
    licenseTypeInfo: LiscenceType

    @ManyToOne(type => PackageTerms,pacter => pacter.settingsInfo,{nullable:true})
    @JoinColumn({name:'package_terms_id'})
    packageTermsInfo: PackageTerms

    @ManyToOne(type => PaymentMethod,paymentMethod => paymentMethod.settingsInfo,{nullable:true})
    @JoinColumn({name:'payment_method_id'})
    paymentMethodInfo: PaymentMethod

    @ManyToOne(type => PaymentTerms,paymentTerms => paymentTerms.settingsInfo,{nullable:true})
    @JoinColumn({name:'payment_terms_id'})
    paymentTermsInfo: PaymentTerms

    @ManyToOne(type => DeliveryMethod,DeliveryMethod => DeliveryMethod.settingsInfo,{nullable:true})
    @JoinColumn({name:'delivery_method_id'})
    deliveryMethodInfo: DeliveryMethod

    @ManyToOne(type => DeliveryTerms,DeliveryTerms => DeliveryTerms.settingsInfo,{nullable:true})
    @JoinColumn({name:'delivery_terms_id'})
    deliveryTermsInfo: DeliveryTerms

    @ManyToOne(type => Address,address => address.settingsInfo,{nullable:true})
    @JoinColumn({name:'buyer_address_id'})
    addressInfo: Address

}