import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId, VersionColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { BuyersDestionations } from "../buyers-destination/buyers-destination.entity";
import { ItemSkus } from "../sku-generation/sku-generation.entity";
import { OrderLine } from "../style-order/order-line.entity";
import { Division } from "../division/division.entity";
import { CoLine } from "../style-order/co-line.entity";
@Entity('destination')
export class Destination {

  @PrimaryGeneratedColumn("increment", { name: 'destination_id' })
  destinationId: number;

  @Column("char", {
    nullable: false,
    length: 50,
    name: "destination"
  })
  // @Index({ unique: true })
  destination: string;

  @Column("char", {
    nullable: false,
    length: 50,
    name: "destination_Code"
  })
  // @Index({ unique: true })
  destinationCode: string;

  @Column("char", {
    nullable: false,
    length: 250,
    name: "description"
  })
  // @Index({ unique: true })
  description: string;

  @Column("char", {
    nullable: false,
    length: 30,
    name: "option_Group"
  })
  // @Index({ unique: true })
  optionGroup: string;

  @Column("boolean", {
    nullable: false,
    default: true,
    name: "is_active"
  })
  isActive: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime"
  })
  createdAt: Date;

  @Column("varchar", {
    nullable: false,
    name: "created_user",
    length: 50
  })
  createdUser: string | null;


  @UpdateDateColumn({
    name: "updated_at",
    type: 'datetime'
  })
  updatedAt: Date;

  @Column("varchar", {
    nullable: true,
    name: "updated_user",
    length: 50
  })
  updatedUser: string | null;


  @VersionColumn({
    default: 1,
    name: "version_flag"
  })
  versionFlag: number;


    @OneToMany(type=>BuyersDestionations, vendor=>vendor.buyerDesInfo,{cascade: true})
    destinationInfo:BuyersDestionations[];

    @OneToMany(type=>ItemSkus, item=>item.destinationInfo,{cascade: true})
    itemSkuInfo:ItemSkus;

    @OneToMany(type=>OrderLine, co=>co.destinationInfo,{cascade: true})
    orderLineInfo:OrderLine;

    
@ManyToOne(()=> Division, division=>division.Destination)
@JoinColumn({name:'division_id'})
division:Division;

@OneToMany(type=>CoLine, co=>co.destinationInfo,{cascade: true})
CoLineData:CoLine;
}
