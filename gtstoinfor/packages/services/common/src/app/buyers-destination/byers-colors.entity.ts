import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { Buyers } from "../buyers/buyers.entity";
import { Colour } from "../colours/colour.entity";

@Entity('buyers_color')
export class BuyersColor {

  @PrimaryGeneratedColumn("increment",{name:'buyer_color_id'})
  BcId:number;

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
      default:"ADMIN",
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
   
  @ManyToOne(type=>Colour, color=>color.colorsInfo,{  nullable:false, })
  @JoinColumn({ name:"colour_id"})
  colorInfo: Colour;

  @ManyToOne(type=>Buyers, color=>color.buyerColorsInfo,{  nullable:false, })
  @JoinColumn({ name:"buyer_id"})
  buyerInfo: Buyers;
 }
