import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Settings } from "../settings/settings.entity";
import { Size } from "../sizes/sizes-entity";
import { Colour } from "../colours/colour.entity";
import {ItemTypeEntity} from "../item-type/item-type.entity"
import { ItemSkus } from "../sku-generation/sku-generation.entity";
// @Entity('division')
// export class Division {

//   @PrimaryGeneratedColumn("increment",{name:'division_id'})
//   divisionId:number;

//   @Column("varchar",{
//       nullable:false,
//       length:50,
//       name:"division_name"
//       })
//   // @Index({ unique: true })
//   divisionName:string;

//   @Column("varchar",{
//     nullable:false,
//     length:50,
//     name:"division_code"
//     })
// // @Index({ unique: true })
// divisionCode:string;
// @Column("int",{
//     nullable:false,
  
//     name:"company_id"
//     })

// // @Index({ unique: true })
// companyId:number;


// // @Index({ unique: true })
// organizationCode:string;

//   @Column("boolean",{
//     nullable:false,
//     default:true,
//     name:"is_active"
//     })
//   isActive:boolean;
  
//   @CreateDateColumn({
//     name: "created_at",
//     type:"datetime"
//   })
//   createdAt: Date;

//   @Column("varchar", {
//     nullable: false,
//     name: "created_user",
//     length:50
// })
// createdUser: string | null;


//   @UpdateDateColumn({
//       name: "updated_at",
//       type:'datetime'
//   })
//   updatedAt: Date;

//   @Column("varchar", {
//     nullable: true,
//     name: "updated_user",
//     length:50
// })
// updatedUser: string | null;


//   @VersionColumn({
//       default:1,
//       name: "version_flag"
//   })
//   versionFlag: number;

//   // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
//   // endCustomerInfo:EndCustomers[];

//   // @OneToMany(type=>Vendors, vendor=>vendor.currencyInfo,{cascade: true})
//   // vendorInfo:Vendors[];

//   @OneToMany(type => Settings, settings => settings.divisionInfo,{cascade: true})
//   settingsInfo : Settings

//   @OneToOne(()=> Size,size=>size.division,{cascade: true})
//   sizes:Size[]
//   @OneToOne(()=> Colour,color=>color.division,{cascade: true})
//   Colour:Size[]
//   @OneToOne(()=> Colour,destination=>destination.division,{cascade: true})
//   Destination:Size[]

//   @OneToOne(()=> ItemTypeEntity,itemtype=>itemtype.division,{cascade: true})
//   ItemType:ItemTypeEntity[]

//   @OneToMany(type=>ItemSkus, item=>item.styleInfo,{cascade: true})
//   itemSkuInfo:ItemSkus;
// }

@Entity('division')
export class Division extends BaseEntity {

  @PrimaryGeneratedColumn("increment",{ name: 'division_id' })
  divisionId: number;

  @Column("varchar", {
    nullable: false,
    length: 50,
    name: "division_name",
  })
  divisionName: string;

  @Column("varchar", {
    nullable: false,
    length: 50,
    name: "division_code",
  })
  divisionCode: string;

  @Column("int", {
    nullable: false,
    name: "company_id",
  })
  companyId: number;

  // @Column("varchar", {
  //   nullable: true,
  //   name: "organization_code",
  //   length: 50,
  // })
  // organizationCode: string;
  // // @Index({ unique: true })
 organizationCode:string;

    @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length:50
})
updatedUser: string | null;

  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active",
  })
  isActive: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
  })
  createdAt: Date;
    @UpdateDateColumn({
      name: "updated_at",
      type:'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: false,
    name: "created_user",
    length:50
})
createdUser: string | null;
  @VersionColumn({
      default:1,
      name: "version_flag"
  })
  versionFlag: number;

  @OneToMany(type => Settings, settings => settings.divisionInfo)
  settingsInfo: Settings[];

  @OneToMany(() => Size, size => size.division)
  sizes: Size[];

  @OneToMany(() => Colour, color => color.division)
  Colour: Colour[];

  @OneToMany(() => ItemTypeEntity, itemType => itemType.division)
  itemTypes: ItemTypeEntity[];

  @OneToMany(() => ItemSkus, item => item.styleInfo)
  itemSkuInfo: ItemSkus[];

  @OneToOne(()=> Colour,destination=>destination.division,{cascade: true})
   Destination:Size[]
}